const usuarioRouter = require('express').Router();
const token = require('../middlewares/token');

module.exports = (wagner) => {
    const usuarioCtrl = wagner.invoke((Usuario) => require('../controllers/usuario.controller')(Usuario));

    usuarioRouter.get('/get/:id', token.checkJWT, (req, res) => {
        usuarioCtrl.getById(req, res);
    })
    //Definir endpoints
    return usuarioRouter;
}