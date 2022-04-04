const express = require('express');

const controller = require('../controllers/orders-controller');

const router = express.Router();

router.get('/', controller.getMyOrders);

router.post('/:id', controller.submitOrder);

module.exports = router;