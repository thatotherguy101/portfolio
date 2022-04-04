function getTotalPrice(req) {
    const cart = req.session.cart;

    if (!cart || cart.length === 0) {
        return 0.0;
    }

    let total = 0.0;

    for (const item of cart) {

        total += item.price * item.count;
    }

    return total;
}

module.exports = { getTotalPrice: getTotalPrice };
