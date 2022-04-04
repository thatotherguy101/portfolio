const Order = require('../models/order');

async function getMyOrders(req, res, next) {
    const userId = req.session.user;
    let orders;

    try {
        orders = await Order.findOrders(userId);
    } catch (error) {
        return next(error);
    }

    res.render('user-orders', {orders: orders});
}

async function submitOrder(req, res, next) {
    const userId = req.params.id;
    const cart = req.session.cart;
    let order;
     
    try {
        order = new Order(userId, cart);
        await order.save();
    } catch (error) {
        return next(error);
    }

    req.session.cart = [];

    res.redirect('/order/' + userId);
}

module.exports = { getMyOrders, getMyOrders, submitOrder: submitOrder };
