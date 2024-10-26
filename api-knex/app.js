
const express = require('express')
require("dotenv").config();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()


const path = require('path')

const config = require('./routes/config.route')

const add_facts = require('./routes/add_facts.route')

const categories = require('./routes/categories.route')

const facts = require('./routes/facts.route')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
})

app.use('/static',express.static(path.join(__dirname,'static/uploads')))

app.use('/config',config)

app.use('/add_facts',add_facts)
app.use('/categories',categories)
app.use('/facts',facts)
app.use((req,res,next)=>{
    const error = new Error('Route Not Found')
    error.status = 404
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

const port = process.env.SERVER_PORT || 5000
app.listen(port,()=>{
    console.log('listening on port : '+port)
})
        