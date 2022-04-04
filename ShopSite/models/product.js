const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
    constructor(name, price, summary, description, image, id) {
        this.name = name;
        this.price = +price;
        this.summary = summary;
        this.description = description;
        this.image = image;

        if (id) {
            this.id = id.toString();
        }
    }

    async save() {
        if (!this.name || !this.summary || !this.price || !this.description) {
            return;
        }

        let result;
        if (!this.id) {
            result = await db.getDb().collection('products').insertOne({
                name: this.name,
                summary: this.summary,
                price: this.price,
                description: this.description,
                imagePath: this.image,
            });
        } else {
            const prodId = new mongodb.ObjectId(this.id);
            let updateData;

            if (this.image) {
                updateData = {
                    name: this.name,
                    summary: this.summary,
                    price: this.price,
                    description: this.description,
                    imagePath: this.image,
                };
            } else {
                updateData = {
                    name: this.name,
                    summary: this.summary,
                    price: this.price,
                    description: this.description,
                };
            }

            result = await db
                .getDb()
                .collection('products')
                .updateOne(
                    { _id: prodId },
                    {
                        $set: { ...updateData },
                    }
                );
        }
        return result;
    }

    static async getAllProducts() {
        const products = await db
            .getDb()
            .collection('products')
            .find()
            .toArray();
        return products;
    }

    static async getProductById(id) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(id);
        } catch (error) {
            error.code = 404;
            throw error;
        }

        const product = await db
            .getDb()
            .collection('products')
            .findOne({ _id: prodId });

        if (!product) {
            const error = new Error('Could not find that product.');
            error.code = 404;
            throw error;
        }

        return product;
    }

    static async deleteProduct(id) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(id);
        } catch (error) {
            error.code = 404;
            throw error;
        }

        const result = await db
            .getDb()
            .collection('products')
            .deleteOne({ _id: prodId });

        if (!result) {
            const error = new Error('Could not delete Product');
            error.code = 404;
            throw error;
        }

        return result;
    }
}

module.exports = Product;
