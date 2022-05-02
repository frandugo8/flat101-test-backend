
const express = require('express')
const productsCtrl = require('../controllers/products')
const router = express.Router()

router.get('/products', productsCtrl.getProducts)

router.post('/products.product',productsCtrl.saveProduct)

module.exports = router