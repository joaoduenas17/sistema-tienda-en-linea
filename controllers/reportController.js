// controllers/reportController.js
const orders = require('../models/order').getAllOrders();

module.exports.generateReports = (req, res) => {
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const totalCustomers = new Set(orders.map(order => order.customerId)).size;
    const reports = {
        totalSales,
        totalCustomers
    };
    res.render('reports', { reports });
};
