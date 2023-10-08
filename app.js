const express = require('express')
const app = express()
const route = require('./router')
app.use(express.json())
app.use('/', route)
module.exports = app
