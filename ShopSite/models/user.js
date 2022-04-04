const db = require('../data/database');

class User {
    constructor(email, password, name, address, id) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = address;

        if (id) {
            this.id = id;
        }
    }

    static async fetchByEmail(email) {
        if (!email) {
            return false;
        }

        const user = await db
            .getDb()
            .collection('users')
            .findOne({ email: email });

        return user;
    }

    static async userExists(email, password) {
        if (!email || !password) {
            return;
        }

        const user = await db
            .getDb()
            .collection('users')
            .find({ email: email, password: password });

        return user;
    }

    async save() {
        if (!this.email || !this.password || !this.name || !this.address) {
            return;
        }

        const result = await db
            .getDb()
            .collection('users')
            .insertOne({
                email: this.email,
                password: this.password,
                name: this.name,
                address: this.address,
                isAdmin: false,
            });

        return result;
    }
}

module.exports = User;
