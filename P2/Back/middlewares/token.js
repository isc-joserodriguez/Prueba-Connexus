const config = require('../config');
const jwt = require('jsonwebtoken');

const generateJWT = (payload, expiresIn) => jwt.sign(payload, config.secret, { expiresIn });

const verifyJWT = token => jwt.verify(token, config.secret);

const checkJWT = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const decoded = verifyJWT(authorization);
        req.decoded = decoded;
        req.status = true;
        next();
    } catch (error) {
        req.status = false;
        next();
    }
};

module.exports = {
    generateJWT,
    verifyJWT,
    checkJWT
}