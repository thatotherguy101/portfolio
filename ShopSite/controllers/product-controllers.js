const Product = require('../models/product');

async function getProductsPage(req, res, next) {
    let products;
    try{
        products = await Product.getAllProducts();
    } catch (error){
        next(error);
        return;
    }

    res.render('product/all-products', { products: products });
}

async function productDetails(req, res, next) {
    const id = req.params.id;
    let product;

    try{
        product = await Product.getProductById(id);
    } catch (error){
        next(error);
        return;
    }
    
    if (!product) {
        return res.status(404).render('404');
    }

    res.render('product/product-details', { product: product });
}

module.exports = {
    getProductsPage: getProductsPage,
    productDetails: productDetails,
};
