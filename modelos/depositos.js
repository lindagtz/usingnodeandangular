'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//crear objetos para guardar los datos en las colecciones

var DepositosSchema = Schema({
    monto: Number,
    fecha_deposito: Date,
    idcuentaBancaria: { type: Schema.ObjectId, ref: 'CuentaBancaria'},

});


module.exports = mongoose.model('Depositos', DepositosSchema)
//poder sacar estos datos