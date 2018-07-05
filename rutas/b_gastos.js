'use strict'

var express = require('express');
var b_gastosControlador = require('../controladores/b_gastos');
var api = express.Router();
var md_auth = require('../authentication/authenticate');


api.get('/b_gastos', md_auth.ensureAuth, b_gastosControlador.getb_gastos);
api.post('/guardarGastos', md_auth.ensureAuth, b_gastosControlador.guardarGastos);
//api.put('/updateGastos', md_auth.ensureAuth, b_gastosControlador.updateGastos);
//api.delete('/deleteGastos', md_auth.ensureAuth, b_gastosControlador.deleteGastos);


module.exports = api;

