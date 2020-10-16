const usuarioRouter = require('express').Router();
const token = require('../middlewares/token');

module.exports = (wagner) =>{
    const usuarioCtrl = wagner.invoke((Usuario)=> require('../controllers/usuario.controller')(Usuario));
    //Definir endpoints
    return usuarioRouter;
}