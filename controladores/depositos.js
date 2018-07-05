'use strict'

var Depositos= require('../modelos/depositos');
var Cuentabancaria= require('../modelos/cuentabancaria');


//todo lo que solicitamos
var depositos= new Depositos();


function guardarDep(req, res){

    var params= req.body;
      //nos permite recoger datos de la peticion
      console.log(params);
      depositos.monto = params.monto;
      depositos.fecha_deposito = params.fecha_deposito;
      depositos.idCuentabancaria = params.idCuentabancaria;

     
              if(depositos.monto !=null && depositos.fecha_deposito !=null && depositos.idCuentabancaria !=null ){
                  //guardar user
                  depositos.save((err, depStored) => {
                      if(err){
                          res.status(500).send({message: "Error al guardar..."});
  
                      }else{
                          if(!depStored){
                              res.status(404).send({message: "No se guardo..."});
                          }else{
                              res.status(200).send({depositos: depStored});
                          }
                      }
                  });
  
              }else{
                  res.status(200).send({message: "Llenar todos los campos..."});
              }

     
  }//fin de funcion guardar



  module.exports = {
    guardarDep
};