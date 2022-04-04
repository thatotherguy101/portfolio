const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDB() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('shop-site');
}

function getDb() {
    if (!database) {
        throw { message: 'You must connect to the database!' };
    }
    return database;
}

module.exports = { connectToDB: connectToDB, getDb: getDb };
