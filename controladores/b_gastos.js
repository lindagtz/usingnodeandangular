'use strict'


var path = require('path');
var fs = require('fs');
//para las rutas de las fotos

var Gastos = require('../modelos/b_gastos');
var Usuarios = require('../modelos/usuarios');
var gastos = new Gastos();

function getb_gastos(req, res) {
    res.status(200).send({ message: "controlador bgastos ok" });
}

function guardarGastos(req, res) {
    var params = req.body;
    //nos permite recoger datos de la peticion


    console.log(params);

    gastos.descripcion = params.descripcion;
    gastos.idcuentaBancaria = params.idcuentaBancaria;
    gastos.fecha_gasto = params.fecha_gasto;
    gastos.idObra = params.idObra;
    gastos.monto = params.monto;
    gastos.foto = params.foto;

    if (gastos.descripcion != null && gastos.idcuentaBancaria != null && gastos.fecha_gasto != null && gastos.idObra != null && gastos.monto != null && gastos.foto != null) {
        gastos.save((err, gastosStored) => {
            if (err) {
                res.status(500).send({ message: "Error al guardar obra..." });

            } else {
                if (!gastosStored) {
                    res.status(404).send({ message: "No se guardo la obra..." });
                } else {
                    res.status(200).send({ gastos: gastosStored });
                }
            }
        });
    } else {
        res.status(200).send({ message: "Llenar todos los campos..." });
    }

}











module.exports = {
    getb_gastos,
    guardarGastos
};