const bcrypt = require('bcrypt');

const User = require('../models/user');
const validator = require('../utils/validation');
const sessionUtils = require('../utils/session-utils');

function getHomePage(req, res, next) {
    res.render('index');
}

function getSignUp(req, res, next) {
    let inputData = sessionUtils.getErrorData(req, {
        email: '',
        confirmEmail: '',
        password: '',
        address: '',
        name: '',
    });

    res.render('auth/signup', { inputData: inputData });
}

function getLogIn(req, res, next) {
    let inputData = sessionUtils.getErrorData(req, {
        email: '',
        password: '',
    });

    res.render('auth/login', { inputData: inputData });
}

async function createUser(req, res, next) {
    const email = req.body.email.trim();
    const confirmEmail = req.body['confirm-email'].trim();
    const password = req.body.password.trim();
    const name = req.body.name.trim();
    const address = req.body.address.trim();

    if (
        !validator.isUserInfoEntered(
            email,
            confirmEmail,
            password,
            name,
            address
        )
    ) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'You must fill out all the fields.',
                email: email,
                confirmEmail: confirmEmail,
                password: password,
                name: name,
                address: address,
            },
            () => {
                res.redirect('/signup');
            }
        );
        return;
    }

    if (!validator.doEmailsMatch(email, confirmEmail)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'The entered emails do not match',
                email: email,
                confirmEmail: confirmEmail,
                password: password,
                name: name,
                address: address,
            },
            () => {
                res.redirect('/signup');
            }
        );
        return;
    }

    if (!validator.isPasswordLongEnough(password)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage:
                    'Your password must be at least 10 characters long.',
                email: email,
                confirmEmail: confirmEmail,
                password: password,
                name: name,
                address: address,
            },
            () => {
                res.redirect('/signup');
            }
        );
        return;
    }

    if (!validator.isEmailFormatCorrect(email)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'Your email does not match the expected format.',
                email: email,
                confirmEmail: confirmEmail,
                password: password,
                name: name,
                address: address,
            },
            () => {
                res.redirect('/signup');
            }
        );
        return;
    }

    try {
        const existingUser = await User.fetchByEmail(email);

        if (existingUser && existingUser.length != 0) {
            sessionUtils.flashErrors(
                req,
                {
                    errMessage: 'The email address is already in use.',
                    email: email,
                    confirmEmail: confirmEmail,
                    password: password,
                    name: name,
                    address: address,
                },
                () => {
                    res.redirect('/signup');
                }
            );
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 13);

        const user = new User(email, hashedPassword, address, name);

        await user.save();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/login');
}

async function logInUser(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'You must enter both an email and password',
                email: email,
                password: password,
            },
            () => {
                res.redirect('/login');
            }
        );
        return;
    }

    let existingUser;

    try {
        existingUser = await User.fetchByEmail(email);
    } catch (error) {
        next(error);
        return;
    }

    if (!existingUser) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage:
                    'Could not find a user with that email and password',
                email: email,
                password: password,
            },
            () => {
                res.redirect('/login');
            }
        );
        return;
    }

    const passwordsMatch = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!passwordsMatch) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage:
                    'Could not find a user with that email and password',
                email: email,
                password: password,
            },
            () => {
                res.redirect('/login');
            }
        );
        return;
    }

    req.session.user = existingUser._id.toString();
    req.session.isAuth = true;
    req.session.isAdmin = existingUser.isAdmin;
    req.session.cart = [];

    req.session.save(() => {
        res.redirect('/products');
    });
}

function logOut(req, res, next) {
    req.session.user = null;
    req.session.isAuth = false;
    req.session.isAdmin = false;

    res.redirect('/');
}

function get401(req, res, next) {
    res.status(401).render('errors/401');
}

function get403(req, res, next) {
    res.status(403).render('errors/403');
}

module.exports = {
    getHomePage: getHomePage,
    getSignUp: getSignUp,
    createUser: createUser,
    getLogIn: getLogIn,
    logInUser: logInUser,
    logOut: logOut,
    get401: get401,
    get403: get403,
};
