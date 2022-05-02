
const request = require('supertest')
const app = require('../index')
const Product = require('../models/product');

const productName = "Test1"

describe("Products tests", () => {
  beforeEach(async () => {
    const product = new Product({
      "id": "5a934e000102030405000000",
      "name": productName,
      "description": "test",
      "imageURL": "https://images.app.goo.gl/XLVk3hosjmTHeLkHA",
      "price": 249
    })

    await Product.deleteMany()
    await product.save()
  })

  afterEach(() => {    
    jest.restoreAllMocks();
  });

  describe('saveProduct method', () => {
    test('should return 200', async () => {
      await request(app)
        .post('/api/products.product')
        .send({product: {
          "name": "test2",
          "description": "test",
          "price": 50
        }})
        .expect(200)

      const count = await Product.countDocuments({name: "test2"})
      expect(count).toBe(1)
    })

    test('should return 500', async () => {
      await request(app)
        .post('/api/products.product')
        .send({product: {
          "name": "test2",
          "description": "test",
          "price": "only_numbers"
        }})
        .expect(500)
    })
  })

  describe('getProducts method', () => {
    test('should return 200', async () => {
      const result = await request(app)
        .get('/api/products')
        .query({results: 10, page:1, search: "t", sortBy: "price", sortOption: 1})
        .expect(200)

      expect(result.body.products[0]?.name).toEqual(productName.toLowerCase())
    })

    test('should return 500', async () => {
      await request(app)
        .get('/api/products')
        .query({roomId: "default", boardId: "sprint1"})
        .expect(500)
    })
  })
})
