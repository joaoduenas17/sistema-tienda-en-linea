README - Sistema de Gestión de Tienda en Línea
________________________________________
Descripción
Este proyecto es un sistema web integral diseñado para la gestión de una tienda en línea. Permite a los usuarios registrar nuevas cuentas, iniciar sesión, administrar productos, gestionar pedidos y generar reportes de ventas. Además, incluye un dashboard personalizado para visualizar información relevante sobre la tienda.
El sistema está desarrollado siguiendo el estándar ISO 12207, asegurando que se apliquen las mejores prácticas en el ciclo de vida del software.
________________________________________
Características
•	Registro y Login de Usuarios:
o	Autenticación con soporte para 2FA (autenticación en dos factores).
o	Gestión de sesiones seguras con protección CSRF.
•	Dashboard Personalizado:
o	Visualización de gráficos y datos relevantes sobre ventas, productos y pedidos.
•	Gestión de Productos:
o	Crear, editar y eliminar productos.
•	Carrito de Compras:
o	Los clientes pueden agregar productos a su carrito y proceder al pago en línea.
•	Gestión de Pedidos:
o	Visualización y gestión de pedidos realizados por los clientes.
•	Generación de Reportes:
o	Generación de reportes de ventas y clientes que pueden ser descargados o enviados por correo.
________________________________________
Tecnologías Utilizadas
•	Node.js con Express para la creación del servidor.
•	Handlebars para la generación de vistas dinámicas.
•	MySQL o PostgreSQL como base de datos.
•	CSRF Protection para la seguridad en los formularios.
•	bcryptjs para el hashing de contraseñas.
•	jsonwebtoken para la gestión de sesiones con JWT.
•	speakeasy para la implementación de 2FA.
________________________________________
Requisitos del Sistema
•	Node.js (versión 14 o superior)
•	NPM o Yarn como gestor de paquetes.
•	Base de Datos MySQL/PostgreSQL
•	Servidor Web (opcional si no se corre en localhost)
________________________________________
Instalación
1.	Clonar el repositorio:
git clone https://github.com/joaoduenas17/sistema-tienda-en-linea.git
cd sistema-tienda-en-linea
2.	Instalar las dependencias:
npm install
3.	Iniciar la aplicación:
npm start
4.	Acceso a la aplicación:
o	Abre tu navegador web y navega a http://localhost:3000.
o	Puedes iniciar sesión con el usuario de prueba:
	Usuario: admin
	Contraseña: adminpassword
________________________________________
Funcionalidades
•	Registro de Usuario: Los nuevos usuarios pueden registrarse utilizando un nombre de usuario, contraseña y configuración 2FA.
•	Login: Iniciar sesión con nombre de usuario, contraseña y autenticación en dos factores.
•	Dashboard: Visualización de datos relevantes de la tienda.
•	Gestión de Productos: Añadir, editar y eliminar productos.
•	Carrito de Compras: Gestión de productos en el carrito y proceso de checkout.
•	Gestión de Pedidos: Visualización y administración de pedidos.
•	Generación de Reportes: Creación y descarga de reportes de ventas y clientes.
________________________________________
Pruebas
Se han realizado pruebas de unidad y de integración utilizando Mocha y Chai para asegurar el correcto funcionamiento del sistema. Las pruebas cubren las funcionalidades críticas como la autenticación, la gestión de productos y el proceso de pedidos.
Para ejecutar las pruebas:
npm test
________________________________________
Documentación
•	La especificación de requisitos del software está documentada siguiendo el estándar IEEE 830.
•	El proceso de desarrollo se ha gestionado utilizando la metodología Scrum, y se ha documentado utilizando herramientas como Trello.
•	La aplicación está diseñada para cumplir con el estándar ISO 12207.
