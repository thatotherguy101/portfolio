const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const db = require('./data/database');
const sessionConfig = require('./config/session');

const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/product-routes');
const cartRoutes = require('./routes/cart-routes');
const adminRoutes = require('./routes/admin-routes');
const orderRoutes = require('./routes/orders-routes');

const authentMW = require('./middle-ware/authentication-mw');
const authorMW = require('./middle-ware/authorization-mw');
const csrfTokenMW = require('./middle-ware/csrf-token-mw');
const errorHandlerMW = require('./middle-ware/error-handler-mw');
const notFoundMW = require('./middle-ware/not-found-mw');

const mongoSessionStore = sessionConfig.createSessionStore(session);
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.urlencoded({extended: false}));

app.use(session(sessionConfig.createSessionConfig(mongoSessionStore)))
app.use(csrf());

app.use(authentMW);
app.use(csrfTokenMW);

app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use('/admin', authorMW, adminRoutes);
app.use('/order', authorMW, orderRoutes);

app.use(notFoundMW);
app.use(errorHandlerMW);

db.connectToDB().then(()=> {
    app.listen(3000);
}).catch((error) => {
    console.log('Could not connecto to DB.');
    console.log(error);
});
