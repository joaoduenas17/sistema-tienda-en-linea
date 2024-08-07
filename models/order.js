// models/order.js
const orders = [];

module.exports.getAllOrders = () => {
    return orders;
};

module.exports.addOrder = (order) => {
    orders.push(order);
};

module.exports.deleteOrder = (id) => {
    const index = orders.findIndex(order => order.id == id);
    if (index !== -1) {
        orders.splice(index, 1);
        return true;
    }
    return false;
};

module.exports.updateOrder = (id, newData) => {
    const order = orders.find(order => order.id == id);
    if (order) {
        Object.assign(order, newData);
        return true;
    }
    return false;
};
