const mongoose = require('mongoose');
const config = require('../config');
const _ = require('underscore');

module.exports = (wagner) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db, { useNewUrlParser: true });
    wagner.factory('db', () => mongoose);

    //Declara modelo
    const Usuario = require('./usuario.model');
    const models = {
        Usuario
    }
    _.each(models, (v, k) => {
        wagner.factory(k, () => v);
    })
}