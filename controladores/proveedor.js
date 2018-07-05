'use strict'

var Proveedor= require('../modelos/proveedor');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

//todo lo que solicitamos


var proveedor= new Proveedor();





function guardarProv(req, res){

    var params= req.body;
      //nos permite recoger datos de la peticion
      console.log(params);
      proveedor.nombre = params.nombre;
      proveedor.apellidos = params.apellidos;
      proveedor.empresa = params.empresa;
     
              if(proveedor.nombre !=null && proveedor.apellidos !=null && proveedor.empresa !=null){
                  //guardar user
                  proveedor.save((err, provStored) => {
                      if(err){
                          res.status(500).send({message: "Error al guardar..."});
  
                      }else{
                          if(!provStored){
                              res.status(404).send({message: "No se guardo..."});
                          }else{
                              res.status(200).send({proveedor: provStored});
                          }
                      }
                  });
  
              }else{
                  res.status(200).send({message: "Llenar todos los campos..."});
              }

     
  }//fin de funcion guardar

//funcion para actualizar 
function updateProv(req, res){

    var idProveedor = req.params.id;
    var update = req.body;

    Proveedor.findByIdAndUpdate(idProveedor, update, (err, provUpdated) => {
        if(err){
            res.status(500).send({message: "Error al actualizar la cuenta bancaria"});
        }else{
            if(!provUpdated){
                res.status(404).send({message: "No se pudo actualizar la cuenta bancaria"});
            }else{
                res.status(200).send({proveedor: provUpdated});
            }
        }
    });
}
//fin de la funcion actualizar


  
module.exports = {
    guardarProv,
    updateProv
};