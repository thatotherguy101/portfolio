const mongodb = require('mongodb');

const db = require('../data/database');
const Product = require('./product');

class Order {
    constructor(userId, cart) {
        this.userId = userId;
        this.date = new Date();
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }

        this.products = cart;
        this.total = +0;

        for (let cartItem of cart) {
            this.total += cartItem.price * cartItem.count;
        }
    }

    async save() {
        const result = await db.getDb().collection('orders').insertOne({
            userID: this.userId,
            products: this.products,
            date: this.date,
            formattedDate: this.formattedDate,
            totalPrice: this.total,
        });
        return result;
    }

    static async findOrders(id) {
        if (id) {
            return await db
                .getDb()
                .collection('orders')
                .find({ userID: id })
                .sort({ _id: 1 })
                .toArray();
        } else {
            return await db.getDb().collection('orders').find().toArray();
        }
    }
}

module.exports = Order;
