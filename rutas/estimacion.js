'use strict'

//se manejarántodas las rutas para funciones con usuarios...


var express = require('express');
var EstimacionControlador = require('../controladores/estimacion');
//..para salir del dir, cargar fichero usuarios
var api= express.Router();
var md_auth = require('../authentication/authenticate');

//crear rutas para la api y se le pone el método get o post






api.post('/guardarEstim', md_auth.ensureAuth, EstimacionControlador.guardarEstim);
//api.post('/consultarEstim', md_auth.ensureAuth, EstimacionControlador.consultarEstim);
//api.put('/updateEstim', md_auth.ensureAuth, EstimacionControlador.updateEstim);
//api.delete('/deleteEstim', md_auth.ensureAuth, EstimacionControlador.deleteEstim);


//le agregamos el md_auth porque debe estar autenticado


module.exports = api;


//token usado: 