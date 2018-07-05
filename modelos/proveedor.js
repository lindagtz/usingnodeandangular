'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//crear objetos para guardar los datos en las colecciones

var ProveedorSchema = Schema({
    nombre: String,
    apellidos: String,
    empresa: String
    
});


module.exports = mongoose.model('Proveedor', ProveedorSchema)
//poder sacar estos datos