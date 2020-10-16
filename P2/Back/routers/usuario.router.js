const usuarioRouter = require('express').Router();
const token = require('../middlewares/token');

module.exports = (wagner) => {
    const usuarioCtrl = wagner.invoke((Usuario) => require('../controllers/usuario.controller')(Usuario));

    //Crear usuario
    usuarioRouter.post('/signup',(req,res)=>{
        usuarioCtrl.signup(req,res);
    });

    //Iniciar sesión
    usuarioRouter.post('/login',(req,res)=>{
        usuarioCtrl.login(req,res);
    });

    //Verificar sesión
    usuarioRouter.get('/verificarSesion', token.checkJWT, (req, res) => {
        usuarioCtrl.verificarSesion(req, res);
    });

    //Definir endpoints
    return usuarioRouter;
}