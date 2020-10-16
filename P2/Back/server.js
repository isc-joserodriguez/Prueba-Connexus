const express = require('express');
const wagner = require('wagner-core');
const bodyParser = require('body-parser');
var cors = require('cors');

//Importar modelos
require('./models/models')(wagner);

//Rutas
const usuarioRouter = require('./routers/usuario.router')(wagner);

//Configuración del servidor
let app = express();

app.use(cors());

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
app.use("/usuarios", usuarioRouter);

module.exports = app;