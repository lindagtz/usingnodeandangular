'use strict'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var mongoosePaginate = require("mongoose-pagination");
var path = require('path');
var router = require('express').Router();
var passport = require('../config/Cpassword');
var Usuarios = require('../modelos/usuarios');


var autenticacion = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}


var goIndexIfUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    }
    next();
}

//router.get('/',goIndexIfUser, (req, res)=> {
    router.get('/', (req, res) => {

        res.render('login')
    });

router.get('/home', autenticacion, (req, res) => {

    var usuarios = req.user;
    if (req.user.tipo === "Admin") {
        res.render('Admin/inicio', { usuarios: usuarios });
    } else {
        res.render('User/inicio', { usuarios: usuarios });
    }
});

router.get('/catalogo', autenticacion, (req, res) => {

    var usuarios = req.user;
    res.render('Admin/catalogo', { usuarios: usuarios });
});
router.post('/checar_tipo_vista', autenticacion, (req, res) => {
    var usuarios = req.user;
    Usuarios.find({ chec: 1, tipo: "Usuarios" }).sort({ _id: -1 }).exec(function (err, result) {
        var json = {}
        for (var i = 0; i < result.length; i++) {
            var arreglo = {}
            arreglo['_id'] = result[i]._id;
            arreglo['nombre'] = result[i].nombre;
            arreglo['apellidos'] = result[i].apellidos;
            arreglo['tipo'] = result[i].tipo;
            arreglo['correo'] = result[i].correo;
            arreglo['usuario'] = result[i].usuario;
            json[i] = arreglo
        }
        if (err) throw err;
        return res.status(200).send({ result: json });
    });
});



router.post('/login', passport.authenticate('login',
    {   
        failureRedirect: '/',
        successRedirect: '/home',
    }));

router.post('/autenticar', autenticacion, (req, res) => {

    var params = req.query;
    var id_usuario = params.id_usuario;
    var password = params.password;
    //user es la empresa a consultar
    Usuarios.findById(id_usuario, (err, usuario) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!usuario) {
                res.status(404).send({ message: 'El usuario no existe en la base de datos' })
            } else {
                //compara las contraseñas
                bcrypt.compare(password, usuario.password, function (err, check) {
                    if (check) {
                        //devolver al usuarios logueado                            
                        res.status(200).send({ state: true });
                    } else {
                        res.status(200).send({ state: false });
                    }
                })
            }

        }
    })
});




module.exports = router