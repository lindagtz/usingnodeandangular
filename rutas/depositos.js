'use strict'

//se manejarántodas las rutas para funciones con usuarios...


var express = require('express');
var DepControlador = require('../controladores/depositos');
//..para salir del dir, cargar fichero usuarios
var api= express.Router();
var md_auth = require('../authentication/authenticate');

//crear rutas para la api y se le pone el método get o post






api.post('/guardarDep', md_auth.ensureAuth, DepControlador.guardarDep);
//api.post('/consultarDep', md_auth.ensureAuth, DepControlador.consultarDep);
//api.put('/updateDep', md_auth.ensureAuth, DepControlador.updateDep);
//api.delete('/deleteDep', md_auth.ensureAuth, DepControlador.deleteDep);

//le agregamos el md_auth porque debe estar autenticado


module.exports = api;


//token usado: 