
const express = require('express')
const app = express()
const Controller = require('../controllers/categories.controller')
const jwt = require('./jwt')

app.get('/report',Controller.report())
app.get('/all',Controller.getAll())
app.get('/all/:id',Controller.getById())
app.get('/filter',Controller.getByColumn())
app.post('/create',jwt,Controller.createOne())
app.post('/create/list',jwt,Controller.createList())
app.put('/update/:id',jwt,Controller.updateByID())
app.put('/update_column',jwt,Controller.updateByColumn())
app.delete('/delete/:id',jwt,Controller.deleteByID())
app.delete('/delete_list',jwt,Controller.deleteList())

module.exports = app 
        