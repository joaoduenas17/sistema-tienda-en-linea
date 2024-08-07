// models/product.js
const products = [];

module.exports.getAllProducts = () => {
    return products;
};

module.exports.addProduct = (product) => {
    products.push(product);
};

module.exports.deleteProduct = (id) => {
    const index = products.findIndex(p => p.id == id);
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
};

module.exports.updateProduct = (id, newData) => {
    const product = products.find(p => p.id == id);
    if (product) {
        Object.assign(product, newData);
        return true;
    }
    return false;
};
