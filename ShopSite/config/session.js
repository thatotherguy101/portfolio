const mongodbStore = require('connect-mongodb-session');

function createSessionStore(session) {
    const MongodbStore = mongodbStore(session);

    const sessionStore = new MongodbStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'shop-site',
        collection: 'sessions',
    });

    return sessionStore;
}

function createSessionConfig(sessionStore) {
    return {
        secret: 'Secret-Secrets-Are-No-Fun',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    };
}

module.exports = {
    createSessionConfig: createSessionConfig,
    createSessionStore: createSessionStore,
};
