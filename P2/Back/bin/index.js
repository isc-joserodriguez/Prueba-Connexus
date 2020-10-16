const app = require('../server');
const config = require('../config');
//Configuración de servidor http
const server = require('http').Server(app);

//Inicio de servidor
server.listen(config.port);
console.log(`Running on port ${config.port}`);