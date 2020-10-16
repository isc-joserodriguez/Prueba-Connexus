let _usuario;
const hash = require('../middlewares/password');
const tkn = require('../middlewares/token');
/* 
{
    usuario: "User1",
    password: "Pass",
    nombre: "Mariano",
    apellido: "Perez"
}
 */
const signup = (req, res) => {
    const usuario = req.body;
    console.log(usuario);
    _usuario.find({}).then(regs => {
        if (!usuario.usuario || !usuario.password) {
            res.status(400).json({
                code: 400,
                msg: "Debe de ingresar usuario y contraseña para registrarse.",
                detail: []
            });
        } else if (regs.filter(u => u.usuario === usuario.usuario).length > 0) {
            res.status(400).json({
                code: 400,
                msg: "Ya existe ese usuario.",
                detail: []
            });
        } else {
            hash.hashPassword(usuario.password).then(password => {
                usuario.password = password;
                _usuario.create(usuario).then(data => {
                    res.status(200).json({
                        code: 200, msg: "Saved!!!",
                        detail: data
                    });
                }).catch(error => {
                    res.status(400).json({
                        code: 400,
                        msg: "No se pudo insertar!!!",
                        detail: error
                    });
                });
            });
        }
    });
}

const login = (req, res) => {
    let { usuario, password } = req.body;
    _usuario.find({})
        .then(personas => {
            usuario = personas.filter(u => (u.usuario == usuario))[0];
            if (!usuario) {
                res.status(400).json({
                    code: 400,
                    msg: "Error: El usuario es incorrecto",
                    detail: []
                });
            } else {
                hash.comparePassword(password, usuario.password).then(contraseñaCorrecta => {
                    if (!contraseñaCorrecta) {
                        res.status(400).json({
                            code: 400,
                            msg: "Error: La contraseña es incorrecta",
                            detail: []
                        });
                    } else {
                        const tokenTTL = `${1000 * 60 * 60 * 24 * 30}ms`; // ms * s * m * h * d
                        const payload = {
                            nombre: usuario.nombre,
                            apellido: usuario.apellido,
                            usuario: usuario.usuario
                        };
                        const token = tkn.generateJWT(payload, tokenTTL);
                        res.status(200).json({
                            code: 200,
                            msg: "Inicio de sesión correcto.",
                            detail: token
                        });

                    }

                })
            }
        }).catch(error => {
            res.status(400).json({
                code: 400,
                msg: "Error!!!",
                detail: error
            });
        });
}

module.exports = (Usuario) => {
    _usuario = Usuario;
    return ({
        signup, login
    });
}