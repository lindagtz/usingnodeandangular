'use strict'

var mongoose = require('mongoose');
var colors = require('colors');
var app = require('./app');
const express = require('express');
const path = require('path');//rutas
var port = process.env.port || 8001;



//creando conexion a mongodb
mongoose.connect('mongodb://localhost:27017/bdContratistas', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log('La bd ok..');     
        
        //configurando que escuche el puerto y abra el servidor
        app.listen(port, function(){
            console.log(colors.green('===== Iniciando aplicación. Puerto: ' + port + ' ======'));
        });
    }
});