// Simulación de una base de datos de usuarios con un array en memoria
const users = [];

// Función para buscar un usuario por nombre de usuario
module.exports.findUser = (username) => {
  return users.find(user => user.username === username);
};

// Función para agregar un nuevo usuario
module.exports.addUser = (user) => {
  users.push(user);
};

// Función para obtener todos los usuarios (útil para el desarrollo o administración)
module.exports.getAllUsers = () => {
  return users;
};

// Función para eliminar un usuario (opcional, según la funcionalidad requerida)
module.exports.deleteUser = (username) => {
  const index = users.findIndex(user => user.username === username);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

// Función para actualizar los datos de un usuario (opcional)
module.exports.updateUser = (username, newData) => {
  const user = users.find(user => user.username === username);
  if (user) {
    Object.assign(user, newData);
    return true;
  }
  return false;
};
