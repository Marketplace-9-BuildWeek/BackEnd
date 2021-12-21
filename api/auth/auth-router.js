const router = require('express').Router();
const { tokenBuilder } = require('./auth-helpers')
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')
const {checkIfUsernameExists, checkIfUsernameAvailable, validation, errorHandling} = require('./auth-middleware')
const {BCRYPT_ROUNDS} = require('./auth-secrets')

router.post('/login', validation, checkIfUsernameAvailable, (req, res, next) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)

    user.password = hash

    Users.create(user) 
        .then(savedUser => {
            console.log(savedUser)
        })
        .catch(next)      
})

router.post('/register', validation, checkIfUsernameExists, (req, res, next) => {
    let {username, password} = req.body

    Users.findBy({username})
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = tokenBuilder(user)
                res.status(200).json({
                    message: `welcome ${user.username}`, 
                    token,
                })
            } else {
                next({status: 401, message: 'invalid credentials'})
            }
        })
})

router.use(errorHandling)

module.exports = router;