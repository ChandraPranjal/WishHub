const express = require('express');
const { createProducts } = require('../controllers/product.controllers');
const { fetchProducts } = require('../controllers/product.controllers');
const router = express.Router()


router.route('/').post(createProducts);
router.route('/').get(fetchProducts)

module.exports = router