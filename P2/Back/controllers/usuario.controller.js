let _usuario;
const hash = require('../middlewares/password');
const tkn = require('../middlewares/token');

const getById = (req, res) => {
    const id = req.params.id;
    _persona.find({ _id: id })
        .then(persona => {
            res.status(200);
            res.json({
                code: 200,
                msg: "Consulta exitosa.",
                detail: persona
            });
        }).catch(error => {
            res.status(400);
            res.json({
                code: 400,
                msg: "Error.",
                detail: error
            });
        });
}

module.exports = (Usuario) => {
    _usuario = Usuario;
    return ({
        getById
    });
}