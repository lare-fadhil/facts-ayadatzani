
        
const express = require('express')
const app = express()
const Controller = require('../controllers/config.controller')
const jwt = require('./jwt')

app.post('/update-image',Controller.updateImage())


module.exports = app 
        