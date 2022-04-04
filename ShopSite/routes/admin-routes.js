const express = require('express');

const controller = require('../controllers/admin-controllers');
const imageMW = require('../middle-ware/image-mw');

const router = express.Router();

router.get('/', controller.getAdmin);

router.get('/add-product', controller.getAddProduct);

router.post('/add-product', imageMW.single('image'), controller.addProduct);

router.get('/edit-product/:id', controller.getEditProduct);

router.post('/edit-product/:id', imageMW.single('image'), controller.updateProduct);

router.delete('/product/:id', controller.deleteProduct);

router.get('/all-orders', controller.getAllOrders);


module.exports = router;