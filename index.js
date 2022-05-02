const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const products = require('./routes/products')
const app = express()

mongoose.connect(process.env.LOCAL_MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((e) => {
  console.log('There has been an error', e)
})

app.use(cors())

app.use(bodyParser.json())

app.use('/api', products)

module.exports = app