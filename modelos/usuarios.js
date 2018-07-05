'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//crear objetos para guardar los datos en las colecciones

var UsuariosSchema = Schema({
    nombre: String,
    apellidos: String,
    password: String,
    tipo: String,
    correo: String,
    usuario: String
});


module.exports = mongoose.model('Usuarios', UsuariosSchema)
//poder sacar estos datos