const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('../api/auth/auth-router')


const server = express()


server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/auth', authRouter)


module.exports = server
