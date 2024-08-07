// models/report.js
const orders = require('./order').getAllOrders();

module.exports.generateSalesReport = () => {
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = new Set(orders.map(order => order.customerId)).size;

    return {
        totalSales,
        totalOrders,
        totalCustomers
    };
};
