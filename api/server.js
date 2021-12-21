const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('../api/auth/auth-router')
const listingRouter = require('../api/listings/listings-router')

const server = express()


server.use(express.json())
server.use(helmet())
server.use(cors())



server.use('/auth', authRouter)
server.use('/listings', listingRouter)


module.exports = server
