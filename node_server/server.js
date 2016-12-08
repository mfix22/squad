const express        = require('express')
const bodyparser     = require('body-parser')
const morgan         = require('morgan')
const router         = require('./routing')
const config          = require('./config')

const app = express()

app.use( (req, res, next) => {
  req.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  req.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  next()
});

app.use(bodyparser.json())

app.use(morgan('short'))

config
  .connectDB()
  .then( (db) => {
    app.use(router({ db }))

    app.listen(config.PORT)
  })
