const router = require('express').Router();
const { tokenBuilder } = require('./auth-helpers')
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')
const {checkIfUsernameExists, checkIfUsernameAvailable, validation, errorHandling} = require('./auth-middleware')
const {BCRYPT_ROUNDS} = require('./auth-secrets')

router.post('/register', validation, checkIfUsernameAvailable, (req, res, next) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)

    user.password = hash

    Users.create(user) 
        .then(savedUser => {
            console.log(savedUser)
            res.json({message: `Welcome!`})
        })
        .catch(next)      
})

router.post('/login', validation, checkIfUsernameExists, (req, res, next) => {
    let {username, password} = req.body

    Users.findBy({username})
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = tokenBuilder(user)
                res.status(200).json({
                    message: `Hello again, ${user.username}`, 
                    token,
                })
            } else {
                next({status: 401, message: 'invalid credentials'})
            }
        })
})

router.use(errorHandling)

module.exports = router;