// controllers/orderController.js
let orders = require('../models/order').getAllOrders();
let products = require('../models/product').getAllProducts();

module.exports.showOrders = (req, res) => {
    res.render('orders', { orders });
};

module.exports.checkout = (req, res) => {
    const selectedProducts = req.body.products.map(id => products.find(p => p.id == id));
    const total = selectedProducts.reduce((acc, product) => acc + product.price, 0);
    const order = {
        id: orders.length + 1,
        products: selectedProducts,
        total
    };
    orders.push(order);
    res.redirect('/orders');
};
