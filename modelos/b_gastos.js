    'use strict'


    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    //crear objetos para guardar los datos en las colecciones
    
    var B_GastosSchema = Schema({
        descripcion: String,
        fecha_gasto: Date,
        monto: Number,
        idProveedor: { type: Schema.ObjectId, ref: 'Proveedor'},   
        idCuentabancaria: { type: Schema.ObjectId, ref: 'Cuentabancaria' },
        idObra: { type: Schema.ObjectId, ref: 'Obras'}
   

    });
    
    
    module.exports = mongoose.model('B_Gastos', B_GastosSchema)
    //poder sacar estos datos