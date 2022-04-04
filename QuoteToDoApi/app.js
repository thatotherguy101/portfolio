const express = require('express');

const apiRoutes = require('./routes/api-routes');
const db = require('./data/database');
const todoRoutes = require('./routes/todo-routes');
const enableCORS = require('./middleware/cors');

const app = express();

app.use(enableCORS);
app.use(express.json());

app.use('/quotes', apiRoutes);
app.use('/todos', todoRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        message: 'Something went wrong.',
    });
});

db.initDB()
    .then(() => {
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Could not connect to db');
    });
