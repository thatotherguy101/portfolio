const res = require('express/lib/response');

class Cart {
    constructor(itemId, name, price, imagePath, count) {
        this.id = itemId;
        this.name = name;
        this.price = price;
        this.imagePath = imagePath;

        if (count) {
            this.count = count;
        } else {
            this.count = 1;
        }
    }

    isItemInCart(cart) {
        if (!cart || cart.length === 0) {
            return false;
        }

        for (const item of cart) {
            if (item.id.toString() === this.id.toString()) {
                return true;
            }
        }

        return false;
    }

    incrementItemCount(cart) {
        if (!cart || cart.length === 0) {
            return;
        }

        for (const item of cart) {
            if (item.id.toString() === this.id.toString()) {
                item.count++;
                return;
            }
        }
    }

    add(req, action) {
        const cart = req.session.cart;

        if (!cart) {
            return;
        }

        if (cart.length >= 0 && this.isItemInCart(cart)) {
            this.incrementItemCount(cart);
        } else {
            cart.push({ ...this });
        }

        req.session.save(action);
    }

}

module.exports = Cart;
