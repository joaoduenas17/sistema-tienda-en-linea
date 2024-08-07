const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const { findUser, addUser } = require('../models/user');

module.exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  // Validar los datos de entrada
  if (!username || !password || !email) {
    return res.status(400).render('register', { error: 'Todos los campos son obligatorios', csrfToken: req.csrfToken() });
  }

  // Verificar si el usuario ya existe
  if (findUser(username)) {
    return res.status(400).render('register', { error: 'Usuario ya registrado', csrfToken: req.csrfToken() });
  }

  // Hashear la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Crear el secreto para 2FA
  const secret = speakeasy.generateSecret({ length: 20 }).base32;

  // Añadir el usuario a la "base de datos"
  addUser({ username, password: hashedPassword, secret, email });

  res.redirect('/login');
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).render('login', { error: 'Credenciales incorrectas', csrfToken: req.csrfToken() });
  }

  req.session.user = username; // Crear sesión para el usuario

  // Redirigir al dashboard directamente para simplificar
  res.redirect('/dashboard');
};

module.exports.verify2FA = (req, res) => {
  const { username, token2FA } = req.body;
  const user = findUser(username);

  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: 'base32',
    token: token2FA
  });

  if (verified) {
    req.session.user = username;
    const token = jwt.sign({ username }, 'jwt_secret_key');
    res.status(200).redirect('/dashboard');
  } else {
    res.status(401).render('verify2FA', { error: 'Código 2FA incorrecto', csrfToken: req.csrfToken(), username });
  }
};





