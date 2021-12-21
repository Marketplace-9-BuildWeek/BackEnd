//validate (needs all to be present) restricted 
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../auth/auth-secrets')

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

const validateListing = (req, res, next) => {
    let listing = req.body
    if (!listing.name || !listing.category || !listing.description || !listing.price || !listing.location_id) {
        next({status: 422, message: 'Please fill out the required fields'})
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
    validateListing,
    errorHandling,
}