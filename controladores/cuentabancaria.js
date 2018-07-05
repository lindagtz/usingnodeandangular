'use strict'


var Cuentabancaria = require('../modelos/cuentabancaria');
var Usuarios = require('../modelos/usuarios');

//todo lo que solicitamos

function testcb(req, res) {
    res.status(200).send({
        message: "Testeando controler de cuentab"
    });
}
//probando controlador

function getcbById(req, res) {
    //consulta de cuentas bancarias por id de cuenta banc

    var cuentabancariaId = req.params.id;


    Cuentabancaria.findById(cuentabancariaId).populate({ path: 'usuarios' }).exec((err, cuentabancaria) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!cuentabancaria) {
                res.status(404).send({ message: "No existe la cuenta bancaria" });

            } else {
                res.status(200).send({ cuentabancaria });
            }
        }
    })
}
//obtener una cuenta bancaria por Id del usuario o todas
function getcb(req, res) {
    var idUsuario = req.params.usuario;

    if (!idUsuario) {
        //si tenemos el id, sacar los registros de la bd
        res.status(404).send({ message: "no hay neel.." });


    } else {
        //sacara datos especificos de un user
        var find = Cuentabancaria.find({ usuario: idUsuario }).sort('noCuenta');

    }
    find.populate({ path: 'idUsuario' }).exec((err, cuentabancaria) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición.." });
        } else {
            if (!cuentabancaria) {
                res.status(404).send({ message: "No hay cuentas bancarias.." });

            } else {
                res.status(200).send({ cuentabancaria });
            }
        }
    });
    //
}//obtener todas las cb de la bd


function guardarCuentabancaria(req, res) {
    var cuentabancaria = new Cuentabancaria();
    var params = req.body;
    //nos permite recoger datos de la peticion

    console.log(params);

    cuentabancaria.updatedAt = params.updatedAt;
    cuentabancaria.createdAt = params.createdAt;
    cuentabancaria.noCuenta = params.noCuenta;
    cuentabancaria.banco = params.banco;

    if (cuentabancaria.updatedAt != null && cuentabancaria.createdAt != null && cuentabancaria.noCuenta != null && cuentabancaria.banco != null) {
        //guardar user
        cuentabancaria.save((err, cbStored) => {
            if (err) {
                res.status(500).send({ message: "Error al guardarcb..." });

            } else {
                if (!cbStored) {
                    res.status(404).send({ message: "No se guardo cb..." });
                } else {
                    res.status(200).send({ cuentabancaria: cbStored });
                }
            }
        });
    } else {
        res.status(200).send({ message: "Llenar todos los campos..." });
    }

}

//funcion para actualizar cb
function actualizarcb(req, res) {

    var idCuentabancaria = req.params.id;
    var update = req.body;

    Cuentabancaria.findByIdAndUpdate(idCuentabancaria, update, (err, cbUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar la cuenta bancaria" });
        } else {
            if (!cbUpdated) {
                res.status(404).send({ message: "No se pudo actualizar la cuenta bancaria" });
            } else {
                res.status(200).send({ cuentabancaria: cbUpdated });
            }
        }
    });
}
//fin de la funcion actualizar



function borrarcb(req, res) {
    //borrar cuenta bancaria
    var idCuentabancaria = req.params.id;

    Cuentabancaria.findByIdAndRemove(idCuentabancaria, (err, cbRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });

        } else {
            if (!cbRemoved) {
                res.status(404).send({ message: "No se borró la cuenta bancaria" });

            } else {
                res.status(500).send({ cuentabancaria: cbRemoved });

            }

        }
    });

}//fin de la funcion borrar




//200 errores simples
//400 inexistencia
//500 errores may
module.exports = {
    testcb,
    getcbById,
    getcb,
    guardarCuentabancaria,
    actualizarcb,
    borrarcb
};