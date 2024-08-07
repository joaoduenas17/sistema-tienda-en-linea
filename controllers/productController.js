// controllers/productController.js
const products = require('../models/product').getAllProducts();

module.exports.showProducts = (req, res) => {
    res.render('products', { products });
};

module.exports.addProduct = (req, res) => {
    const { name, price, description } = req.body;
    const id = products.length + 1;
    products.push({ id, name, price, description });
    res.redirect('/products');
};

module.exports.editProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const product = products.find(p => p.id == id);
    product.name = name;
    product.price = price;
    product.description = description;
    res.redirect('/products');
};

module.exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id != id);
    res.redirect('/products');
};
