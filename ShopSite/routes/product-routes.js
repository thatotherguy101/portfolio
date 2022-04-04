const express = require('express');

const controller = require('../controllers/product-controllers');

const router = express.Router();

router.get('/products', controller.getProductsPage);

router.get('/products/:id', controller.productDetails);

module.exports = router;