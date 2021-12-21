// checkIfUsernameAvailable, validation, checkIfUsernameExists, errorhandling, restricted

const db = require('../data/db-config')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./auth-secrets')

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        next({status: 401, message: 'token required'})
    } 
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return next ({status: 401, message: 'token invalid'})
        } 
        req.decodedJwt = decoded
        next()
    })
}
const checkIfUsernameAvailable = async (req, res, next) => {
    console.log('about to check')
    const username = await db('users').where('username', req.body.username).first()
    console.log('we made it to check username')
    if (username) {
        next({status: 401, message: 'username taken'})
    } else {
        next()
    }
}
const checkIfUsernameExists = async (req, res, next) => {
    const username = await db('users').where('username', req.body.username).first()
    if (username) {
        next()
    } else {
        next({status: 401, message: 'invalid credentials'})
    }
}
const validation = async (req, res, next) => {
    console.log('validating')
    if (!req.body.username || !req.body.password) {
        next({status: 422, message: 'username and password required'})
    } else {
        next()
    }
}
const errorHandling = (err, req, res, next) => {//eslint-disable-line
    res.status(err.status || 500).json({
        message: `${err.message}`
    })
}
module.exports = {
    restricted,
    checkIfUsernameAvailable, 
    checkIfUsernameExists, 
    validation,
    errorHandling,
}