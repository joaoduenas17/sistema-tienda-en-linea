const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const csrf = require('csurf');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy'); // Asegúrate de tener este módulo instalado
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const dashboardController = require('./controllers/dashboardController');
const reportController = require('./controllers/reportController');
const { findUser, addUser } = require('./models/user');

const app = express();

// Configurar Handlebars con Layouts
app.engine('hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(csrf()); // Protección CSRF

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Crear un usuario admin al iniciar la aplicación si no existe
const createAdminUser = () => {
    const username = 'admin';
    const password = 'adminpassword';
    const email = 'admin@example.com';

    const userExists = findUser(username);
    if (!userExists) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const secret = speakeasy.generateSecret({ length: 20 }).base32; // Generar un secreto para 2FA
        addUser({ username, password: hashedPassword, secret, email });
        console.log('Usuario admin creado');
    }
};

// Ejecutar la creación del usuario admin
createAdminUser();

// Ruta para la raíz ("/")
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirige a la página de login
});

// Rutas para autenticación
app.get('/login', (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
});
app.post('/login', authController.login);
app.get('/verify2FA', (req, res) => {
    res.render('verify2FA', { csrfToken: req.csrfToken() });
});
app.post('/verify2FA', authController.verify2FA);
app.get('/register', (req, res) => {
    res.render('register', { csrfToken: req.csrfToken() });
});
app.post('/register', authController.register);
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Rutas protegidas
app.get('/dashboard', authMiddleware, dashboardController.showDashboard);

// Rutas para gestión de productos
app.get('/products', authMiddleware, productController.showProducts);
app.post('/products/add', authMiddleware, productController.addProduct);
app.post('/products/edit/:id', authMiddleware, productController.editProduct);
app.post('/products/delete/:id', authMiddleware, productController.deleteProduct);

// Rutas para el carrito de compras y pedidos
app.get('/cart', authMiddleware, (req, res) => {
    res.render('cart', { cart: [], total: 0 }); // Esto es solo una muestra, debería ser dinámico
});
app.post('/cart/checkout', authMiddleware, orderController.checkout);
app.get('/orders', authMiddleware, orderController.showOrders);

// Rutas para reportes
app.get('/reports', authMiddleware, reportController.generateReports);

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));


