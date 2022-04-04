const express = require('express');

const purchaseController = require('../controllers/cart-controllers');

const router = express.Router();

router.get('/cart', purchaseController.getCart);

router.post('/cart/:id', purchaseController.addItemToCart);

router.post('/empty-cart', purchaseController.deleteCart);

module.exports = router;