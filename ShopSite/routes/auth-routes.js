const express = require('express');

const controller = require('../controllers/auth-controllers');

const router = express.Router();

router.get('/', controller.getHomePage);

router.get('/signup', controller.getSignUp);

router.post('/signup', controller.createUser);

router.get('/login', controller.getLogIn);

router.post('/login', controller.logInUser);;

router.post('/logout', controller.logOut);

router.get('/401', controller.get401);

router.get('/403', controller.get403);

module.exports = router;
