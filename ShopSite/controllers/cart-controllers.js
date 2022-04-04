const Product = require('../models/product');
const Cart = require('../models/cart');

const checkoutUtils = require('../utils/checkout-utils');

async function addItemToCart(req, res, next){
    const id = req.params.id;
    let product;
    try {
        product = await Product.getProductById(id);
    } catch (error){
        return next(error);
    }

    const cartItem = new Cart(product._id.toString(), product.name, product.price, product.imagePath);

    cartItem.add(req, () => {res.redirect('/cart')});
}

function getCart(req, res, next){
    
    const cart = req.session.cart;

    totalPrice = checkoutUtils.getTotalPrice(req);

    res.render('cart', {cart: cart, totalPrice: totalPrice, userId: req.session.user});
}

function deleteCart(req, res, next){
    req.session.cart = [];

    res.redirect('/cart');
}

module.exports = {addItemToCart: addItemToCart, getCart: getCart, deleteCart: deleteCart}