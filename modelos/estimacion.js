'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//crear objetos para guardar los datos en las colecciones

var EstimacionSchema = Schema({
    nombre: String,
    monto_est: Number,
    extras: {type: Number, default: 0},
    monto_conceptos_extras: {type: Number, default: 0},
    amortizacion_anticipo: Number, 
    fondo_garantia: Number,
    subtotal: Number,
    iva: Number,
    total: Number,
    pagado: { type: Boolean, default: false},
    fecha_inicio: Date,
    fecha_limite: Date,
    idCtabancaria: { type: Schema.ObjectId, ref: 'Cuentabancaria'},
    idObra: { type: Schema.ObjectId, ref: 'Obra'}

});


module.exports = mongoose.model('Estimacion', EstimacionSchema)
//poder sacar estos datos