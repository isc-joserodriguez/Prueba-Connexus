const express = require('express');
const wagner = require('wagner-core');
const bodyParser = require('body-parser');

//Importar modelos
require('./models/models')(wagner);

//Rutas
const usuarioRouter = require('./routers/usuario.router')(wagner);

//Configuración del servidor
let app = express();

// Configurar cabeceras y <span class="searchword">cors</span>
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-<span class="searchword">API</span>-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Agregar la ruta
app.use("/usuario", usuarioRouter);

module.exports = app;