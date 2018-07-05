'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EstimacionSchema = require('../modelos/estimacion');

//crear objetos para guardar los datos en las colecciones

var ObrasSchema = Schema({
    nombre: String,
    precio_contrato: Number,
    fecha_inicio: Date,
    fecha_limite: Date,
    porcentaje_anticipo: Number,
    direccion: String,
    idUsuario: { type: Schema.ObjectId, ref: 'Usuario'},
    anticipoPagado: { type: Boolean, default: false},
 
});

var ObrasSchema = mongoose.model('Obras', ObrasSchema);
module.exports = ObrasSchema;
//poder sacar estos datos