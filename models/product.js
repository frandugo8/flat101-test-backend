
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    maxlength: 30,
    required: true    
  },
  description: {
    type: String,
    maxlength: 300,
  },
  price: Number,
  imageURL: {
    type: String,
    maxlength: 300,
  }
},
{
  timestamps: true,
  versionKey: false
})

productSchema.pre('save', async function (next) {

  const user = this
  user.name = user.name.toLowerCase()
  
  next()
})

const Product = mongoose.model('Products', productSchema)

module.exports = Product