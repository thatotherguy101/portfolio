const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function initDB(){
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('api-prac');
}

function getDb(){
    if(!database){
        throw new Error("Database not initialized");
    }

    return database;
}

module.exports = {initDB: initDB, getDb: getDb};