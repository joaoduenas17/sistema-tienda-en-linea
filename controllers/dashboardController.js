// controllers/dashboardController.js
const orders = require('../models/order').getAllOrders();

module.exports.showDashboard = (req, res) => {
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    res.render('dashboard', { totalSales, totalOrders });
};