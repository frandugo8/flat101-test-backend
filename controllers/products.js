
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/product');

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const pageSize = parseInt(req.query.results)
    const sortBy = req.query.sortBy
    const sortOption = parseInt(req.query.sortOption)
    const search = req.query.search

    const result = await Promise.all([
      Product
        .find(search && search !== ""? { name: {$regex: new RegExp("^"+ req.query.search?.toLowerCase()) }} : {})
        .sort(sortBy && sortOption? {[sortBy]: sortOption} : { name: 1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize),

      Product.countDocuments()
    ])

    return res.status(200).send({total: result[1], page, products: result[0], hasPrev: page > 1, hasNext: page * pageSize < result[1]})
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' })
  }
}

const saveProduct = async (req, res) => {
  try {
    const id = uuidv4()
    const product = new Product({
      id,
      ...req.body.product
    })

    await product.save()
    
    return res.status(200).send({ id })
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getProducts,
  saveProduct
}