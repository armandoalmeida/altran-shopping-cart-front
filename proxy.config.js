const proxy = [
    {
        context: '/api',
        target: 'https://altra-shopping-cart-backend.herokuapp.com',
        pathRewrite: { '^/api': '' }
    }
];
module.exports = proxy;