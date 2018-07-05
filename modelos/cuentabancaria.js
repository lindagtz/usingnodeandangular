'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//crear objetos para guardar los datos en las colecciones

var CuentaBancariaSchema = Schema({
    updatedAt: Date,
    createdAt: Date,
    noCuenta: String,
    banco: String
    

},

{
    timestamps: true
});


module.exports = mongoose.model('CuentaBancaria', CuentaBancariaSchema)
//poder sacar estos datos