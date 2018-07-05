'use strict'

var Estimacion= require('../modelos/estimacion');
var Obras= require('../modelos/obras');
var Proveedor= require('../modelos/proveedor');


//todo lo que solicitamos
var estimacion= new Estimacion();






function guardarEstim(req, res){

    var params= req.body;
      //nos permite recoger datos de la peticion
      console.log(params);
      estimacion.nombre = params.nombre;
      estimacion.monto = params.monto;
      estimacion.extras = params.extras;
      estimacion.subtotal = params.subtotal;
      estimacion.iva = params.iva;
      estimacion.total = params.total;
      estimacion.fecha_inicio = params.fecha_inicio;
      estimacion.fecha_fin = params.fecha_fin;
      estimacion.idObra = params.idObra;
      estimacion.idProveedor = params.idProveedor;

     
              if(estimacion.nombre !=null && estimacion.monto !=null && estimacion.extras !=null && estimacion.subtotal !=null
                && estimacion.iva !=null && estimacion.total !=null && estimacion.fecha_inicio !=null 
                && estimacion.fecha_fin !=null && estimacion.idObra !=null  && estimacion.idProveedor !=null){
                  //guardar user
                  estimacion.save((err, estimStored) => {
                      if(err){
                          res.status(500).send({message: "Error al guardar..."});
  
                      }else{
                          if(!estimStored){
                              res.status(404).send({message: "No se guardo..."});
                          }else{
                              res.status(200).send({estimacion: estimStored});
                          }
                      }
                  });
  
              }else{
                  res.status(200).send({message: "Llenar todos los campos..."});
              }

     
  }//fin de funcion guardar



  module.exports = {
    guardarEstim
};