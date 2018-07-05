'use strict'

var Usuarios = require('../modelos/usuarios');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoosePagination = require('mongoose-pagination');
//todo lo que solicitamos


var usuarios = new Usuarios();


function test(req, res) {
    res.status(200).send({
        message: "Testeando controler de users"
    });
}
//funcion para insertar nuevos usuarios
function guardarUsuario(req, res) {
    //  var usuarios= new Usuarios();
    var params = req.body;
    //nos permite recoger datos de la peticion
    console.log('entro');
    usuarios.nombre = params.nombre;
    usuarios.apellidos = params.apellidos;
    usuarios.password = params.password;
    usuarios.tipo = params.tipo;
    usuarios.correo = params.correo;
    usuarios.usuario = params.usuario;

    if (params.password) {
        //Encriptar password aqui
        bcrypt.hash(params.password, null, null, function (err, hash) {
            usuarios.password = hash;
            if (usuarios.nombre != "" && usuarios.apellidos != "" && usuarios.tipo != "" && usuarios.correo != "" && usuarios.usuario != "") {
                //guardar user
                console.log('si todos')
                usuarios.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: "Error al guardar..." });

                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: "No se guardo..." });
                        } else {
                            res.status(200).send({ usuarios: userStored, message: "Se ha guardado correctamente" });

                        }
                    }
                });

            } else {
                console.log('no todos')
                res.status(404).send({ message: "Llenar todos los campos..." });
            }
        });
    } else {
        console.log('no pass')
        res.status(404).send({ message: 'Introduce la contraseña' });
    }
}//fin de funcion guardar
//200 errores simples
//400 inexistencia
//500 errores may

//funcion para validar login
function validarLogIn(req, res) {
    var params = req.body;

    var correo = params.correo;
    var password = params.password;

    Usuarios.findOne({ correo: correo.toLowerCase() }, (err, usuarios) => {
        if (err) {
            res.status(500).send({ message: "Errooor.." });

        } else {
            if (!usuarios) {

                res.status(404).send({ message: "El usuario no existe.." });

            } else {
                //password

                bcrypt.compare(req.body.password, usuarios.password, function (err, check) {
                    if (check) {

                        //dar datos de user
                        if (params.gethash) {
                            //manejar un token
                            res.status(200).send({
                                token: jwt.createToken(usuarios)
                            });

                        } else {
                            res.status(200).send({ usuarios });
                        }
                    } else {
                        res.status(404).send({ message: "No se pudo iniciar sesión" });
                    }
                });
            }
        }
    });
}
//fin de funcion validarLogin


function getUsuario(req, res) {

    Usuarios.find({}).sort("tipo").exec(function (err, usuarios, total) {
        if (err) {
            res.status(500).send({ message: "Erroor" });
            console.log("Erroor");
        } else {
            if (!usuarios) {
                res.status(404).send({ message: "No hay users" });
                console.log("no usr");

            } else {
                return res.status(200).send({

                    usuarios: usuarios


                });
                console.log(usuarios);

            }
        }
    });
}
//fin de consultar usuarios
//funcion para obtener user por id
function getUsuarioById(req, res) {
    //consulta de cuentas bancarias por id de cuenta banc
    var idUsuario = req.params.id;

    Usuarios.findById(idUsuario).populate({ path: 'usuarios' }).exec((err, usuarios) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!usuarios) {
                res.status(404).send({ message: "No existe el user" });

            } else {
                res.status(200).send({ usuarios });
            }
        }
    });
}

//funcion para actualizar usuario
function actualizarUsuario(req, res) {

    var idUsuario = req.params.id;
    var update = req.body;

    Usuarios.findByIdAndUpdate(idUsuario, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar al user" });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: "No se pudo actualizar al user" });
            } else {
                res.status(200).send({ usuarios: userUpdated });
            }
        }
    });
}
//fin de la funcion actualizar

function borrarUser(req, res) {
    //borrar user

    var idUsuario = req.params.id;

    Usuarios.findByIdAndRemove(idUsuario, (err, usuarioRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });

        } else {
            if (!usuarioRemoved) {
                res.status(404).send({ message: "No se borró el usuario" });

            } else {
                res.status(500).send({ usuarios: usuarioRemoved });

            }

        }
    });

}//fin de la funcion borrar



module.exports = {
    guardarUsuario,
    test,
    validarLogIn,
    actualizarUsuario,
    getUsuario,
    borrarUser,
    getUsuarioById
};