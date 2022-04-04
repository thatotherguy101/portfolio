const Product = require('../models/product');
const Order = require('../models/order');
const sessionUtils = require('../utils/session-utils');
const validator = require('../utils/validation');

function getAdmin(req, res, next) {
    res.render('admin/admin');
}

function getAddProduct(req, res, next) {
    const inputData = sessionUtils.getErrorData(req, {
        hasError: false,
        name: '',
        price: '',
        summary: '',
        description: '',
    });

    res.render('admin/add-product', { inputData: inputData });
}

async function addProduct(req, res, next) {
    const name = req.body.name.trim();
    const price = req.body.price.trim();
    const summary = req.body.summary.trim();
    const description = req.body.description.trim();
    const image = req.file;

    if (
        !validator.isProductInfoEntered(
            name,
            price,
            summary,
            description,
            image
        )
    ) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'All fields must be filled out.',
                name: name,
                price: price,
                summary: summary,
                description: description,
            },
            () => {
                res.redirect('admin/add-product');
            }
        );
        return;
    }

    if (!validator.isPriceValid(price)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'The entered price is invalid',
                name: name,
                price: price,
                summary: summary,
                description: description,
            },
            () => {
                res.redirect('admin/add-product');
            }
        );
        return;
    }

    if (!validator.isSummaryShort(summary)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage:
                    'The summary must be no more than 25 characters long',
                name: name,
                price: price,
                summary: summary,
                description: description,
            },
            () => {
                res.redirect('admin/add-product');
            }
        );
        return;
    }

    const product = new Product(name, price, summary, description, image.path);

    try {
        await product.save();
        res.redirect('/products');
    } catch (error) {
        next(error);
        return;
    }
}

async function getEditProduct(req, res, next) {
    let inputData = sessionUtils.getErrorData(req, {
        hasError: false,
        _id: '',
        name: '',
        price: '',
        summary: '',
        description: '',
    });

    if (!inputData.hasError) {
        try {
            inputData = await Product.getProductById(req.params.id);
        } catch (error) {
            next(error);
            return;
        }
    }

    res.render('admin/edit-product', { inputData: inputData });
}

async function updateProduct(req, res, next) {
    const id = req.params.id;
    const name = req.body.name.trim();
    const price = req.body.price.trim();
    const summary = req.body.summary.trim();
    const description = req.body.description.trim();
    let imagePath = req.file;

    if (imagePath) {
        imagePath = imagePath.path;
    }

    if (!validator.isUpdateInfoEntered(name, price, summary, description)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'All fields expect the image must be filled out.',
                _id: id,
                name: name,
                price: price,
                summary: summary,
                description: description,
            },
            () => {
                res.redirect('admin/edit-product/' + id);
            }
        );
        return;
    }

    if (!validator.isPriceValid(price)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage: 'The entered price is invalid',
                _id: id,
                name: name,
                price: price,
                summary: summary,
                description: description,
            },
            () => {
                res.redirect('admin/edit-product/' + id);
            }
        );
        return;
    }

    if (!validator.isSummaryShort(summary)) {
        sessionUtils.flashErrors(
            req,
            {
                errMessage:
                    'The summary must be no more than 25 characters long',
                name: name,
                _id: id,
                price: price,
                summary: summary,
                description: description,
            },
            () => {
                res.redirect('admin/edit-product/' + id);
            }
        );
        return;
    }

    const product = new Product(
        name,
        price,
        summary,
        description,
        imagePath,
        id
    );

    try {
        product.save();
        res.redirect('/products');
    } catch (error) {
        next(error);
        return;
    }
}

async function deleteProduct(req, res, next) {
    const id = req.params.id;

    try {
        await Product.deleteProduct(id);
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/products');
}


async function getAllOrders(req, res, next){
    let orders;
    
    try{
        orders = await Order.findOrders();
    } catch (error){
        return next(error);
    }

    res.render('user-orders', {orders: orders});
}

module.exports = {
    getAdmin: getAdmin,
    getAddProduct: getAddProduct,
    addProduct: addProduct,
    getEditProduct: getEditProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getAllOrders: getAllOrders
};
