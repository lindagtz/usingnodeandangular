'use strict'

var Obras= require('../modelos/obras');
var Usuario= require('../modelos/usuarios');
var Proveedor= require('../modelos/proveedor');


//todo lo que solicitamos
var obras= new Obras();


//funcion para obtener obras por id
function getObraById(req, res){
    //consulta de cuentas bancarias por id de cuenta banc
        var obra = req.params.id;
          
        Obra.findById(obraId).populate({path: 'obras'}).exec((err, obra)=>{
            if(err){
                res.status(500).send({message: "Error en la petición"});
            }else{
                if(!obra){
                    res.status(404).send({message: "No existe la obra"});

                }else{
                    res.status(200).send({obra});
                }
            }
        });
}



//funcion para insertar nuevas obras
function guardarObra(req, res){
      var params= req.body;
      //nos permite recoger datos de la peticion
  
  
      console.log(params);
  
      obras.nombre = params.nombre;
      obras.precio_contrato = params.precio_contrato;
      obras.fecha_inicio = params.fecha_inicio;
      obras.fecha_limite = params.fecha_limite;
      obras.porcentaje_anticipo = params.porcentaje_anticipo;
      obras.direccion = params.direccion;
      obras.idUsuario = params.idUsuario;
      obras.anticipoPagado= params.anticipoPagado;
      obras.estimaciones= params.estimaciones;
      obras.idProveedor= params.idProveedor;

            if(obras.nombre !=null && obras.precio_contrato !=null && obras.fecha_inicio !=null && obras.fecha_limite !=null && obras.porcentaje_anticipo !=null && obras.direccion !=null && obras.idUsuario !=null
                && obras.anticipoPagado !=null  && obras.estimaciones !=null && obras.idProveedor !=null ){
                //guardar user
                obras.save((err, obrasStored) => {
                    if(err){
                        res.status(500).send({message: "Error al guardar obra..."});

                    }else{
                        if(!obrasStored){
                            res.status(404).send({message: "No se guardo la obra..."});
                        }else{
                            res.status(200).send({obras: obrasStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message: "Llenar todos los campos..."});
            }
        
}


//fin de funcion guardar obras
//funcion para actualizar 
function updateObra(req, res){

    var idObra = req.params.id;
    var update = req.body;

    Obras.findByIdAndUpdate(idObra, update, (err, obraUpdated) => {
        if(err){
            res.status(500).send({message: "Error al actualizar"});
        }else{
            if(!obraUpdated){
                res.status(404).send({message: "No se pudo actualizar"});
            }else{
                res.status(200).send({obra: obraUpdated});
            }
        }
    });
}
//fin de la funcion actualizar

module.exports = {
    guardarObra,
    updateObra
};