const express        = require('express')
const bodyparser     = require('body-parser')
const morgan         = require('morgan')
const cors           = require('cors')
const router         = require('./routing')
const config          = require('./config')

const app = express()

app.use(cors({
  origin: `http://${config.HOST}`
}));

app.use(bodyparser.json())

app.use(morgan('short'))

config
  .connectDB()
  .then( (db) => {
    app.use(router({ db }))

    app.listen(config.PORT)
  })
