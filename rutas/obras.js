'use strict'
var csv = require("fast-csv");
var fs = require('fs');
//se manejarántodas las rutas para funciones con obras...

var csvfile = __dirname + "/../public/files/obras.csv";
var stream = fs.createReadStream(csvfile);

var express = require('express');
var ObrasControlador = require('../controladores/obras');
var Obras = require('../modelos/obras');

//..para salir del dir, cargar fichero obras
var api= express.Router();
var md_auth = require('../authentication/authenticate');

//crear rutas para la api y se le pone el método get o post


api.post('/guardarObra', md_auth.ensureAuth, ObrasControlador.guardarObra);
//api.post('/consultarObra', md_auth.ensureAuth, ObrasControlador.consultarObra);
api.post('/updateObra', md_auth.ensureAuth, ObrasControlador.updateObra);
//api.post('/deleteObra', md_auth.ensureAuth, ObrasControlador.deleteObra);

//le agregamos el md_auth porque debe estar autenticado


//vamos  ahacer pruebas para insertar datos del excel


api.get('/import', function(req, res, next) {

    var  products  = []
    var csvStream = csv()
        .on("data", function(data){
         
         var param = new Obras({
            nombre: data[0],
            precio_contrato: data[1],
            fecha_inicio: data[2],
            fecha_limite: data[3],
            porcentaje_anticipo:data[4],
            direccion:data[5],
            idUsuario:data[6],
            anticipoPagado:data[7],
            estimaciones:data[8],
            idobra:data[9],

         });
         
          param.save(function(error){
            console.log(param);
              if(error){
                   throw error;
              }
          }); 

    }).on("end", function(){

    });
  
    stream.pipe(csvStream);
    res.json({success : "Datos importados chidamente.", status : 200});
     
  });


  
//funciones
api.post('/registra_obra', (req,res)=>{
    var obras = new Obras();
    var params=req.query;
    console.log(params);
  
      obras.nombre = params.nombre;
      obras.precio_contrato = params.precio_contrato;
      obras.fecha_inicio = params.fecha_inicio;
      obras.fecha_limite = params.fecha_limite;
      obras.porcentaje_anticipo = params.porcentaje_anticipo;
      obras.direccion = params.direccion;
      obras.idUsuario = params.idUsuario;
      obras.anticipoPagado= params.anticipoPagado;
  

            if(obras.nombre !=null && obras.precio_contrato !=null && obras.fecha_inicio !=null && obras.fecha_limite !=null && obras.porcentaje_anticipo !=null && obras.direccion !=null && obras.idUsuario !=null
                && obras.anticipoPagado !=null){
                //guardar user
                obras.save((err, obrasStored) => {
                    if(err){
                        res.status(500).send({message: "Error al guardar obra..."});

                    }else{
                        if(!obrasStored){
                            res.status(404).send({message: "No se guardo la obra..."});
                        }else{
                            res.status(200).send({obras: obrasStored , message:'Obra registrada exitosamente',status:true});

                        }
                    }
                });
            }else{
                res.status(200).send({message: "Llenar todos los campos..."});
            }
});

//consultar las obras
//consultar
api.post('/buscar_obras',(req, res)=>{
    console.log('buscando obras')
    Obras.find({}).sort({_id:-1}).exec(function(err, result) {
        var json={}
        for(var i = 0; i < result.length;i++){
            var arreglo={}
            arreglo['_id']=result[i]._id;
            arreglo['nombre']=result[i].nombre;
            arreglo['precio_contrato']=result[i].precio_contrato;
            arreglo['fecha_inicio']=result[i].fecha_inicio;
            arreglo['fecha_limite']=result[i].fecha_limite;
            arreglo['porcentaje_anticipo']=result[i].porcentaje_anticipo;
            arreglo['direccion']=result[i].direccion;
            arreglo['idUsuario']=result[i].idUsuario;
            arreglo['anticipoPagado']=result[i].anticipoPagado;
            arreglo['idobra']=result[i].id_obra;


            json[i]=arreglo
        }
       
        if (err) throw err;
            return res.status(200).send({resultado_consulta:json});
      });
});

//guardar obra
















//editar obras


api.post('/mostrar_edicion_obra', (req,res)=>{
    var params=req.query;
    console.log(params.id_obra)
    Obras.findById(params.id_obra,(error, obras)=>{
        if(error){
            res.status(500).send({message:'No se ha podido realizar la peticion'+error});
        }else{
            if(!obras){
                res.status(404).send({message:'No se encontro la obra'});

            }else{
                console.log('entro else de bien'+ obras)
                res.status(200).send({nombre:obras.nombre, precio_contrato:obras.precio_contrato, fecha_inicio: obras.fecha_inicio,
                    fecha_limite: obras.fecha_limite, porcentaje_anticipo: obras.porcentaje_anticipo, direccion: obras.direccion,
                    idUsuario: obras.idUsuario, anticipoPagado: obras.anticipoPagado, estimaciones: obras.estimaciones, idobras: obras.idobras,
                    message:true, id_obra:obras._id });
            }
        }
    });
});
//ok
//confirmar editar
api.put('/confirmar_edicion_obra', (req, res) => {
    console.log(req.query.id_obra)
    Obras.findByIdAndUpdate(req.query.id_obra,{nombre:req.query.nombre, precio_contrato:req.query.precio_contrato, fecha_inicio: req.query.fecha_inicio,
        fecha_limite:req.query.fecha_limite,porcentaje_anticipo:req.query.porcentaje_anticipo,direccion:req.query.direccion,idUsuario:req.query.idUsuario,
        anticipoPagado:req.query.anticipoPagado,estimaciones:req.query.estimaciones, id_obra:req.query.id_obra,
    },
        (error, obraUpdate) => {
            console.log(obraUpdate)
            if(error){
                res.send({message:'No se ha podido realizar la petición'+error});
                
            }else{
                if(!obraUpdate){
                    res.send({message:'No se encontro la obra'});
                    
    
                }else{
                    res.send({MensajeActualizado:"La obra ha sido actualizado correctamente",check:true});
                   
    
                }
            }
    });
});

//para borrar obra

api.delete('/confirmar_delete_obra', (req, res) => {
    console.log(req.query);
    Obras.findByIdAndRemove(req.query.id_obra,
        (error, obraDelete) => {
            if(error){
                res.status(500).send({message:'No se ha podido realizar la peticion'+error});
            }else{
                if(!obraDelete){
                    res.status(404).send({message:'No se encontro la obra'});
    
                }else{
                    res.status(200).send({MensajeBorrado:"La obra ha sido borrada correctamente",check:true});
    
                }
            }
    });
});
































module.exports = api;


//token usado: 
//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjEwMzBmZWM0ZmUxYzE1MTgwNGQ4MWIiLCJub21icmUiOiJMaW5kYSIsInRpcG8iOiJxcSIsImNvcnJlbyI6InFxIiwidXN1YXJpbyI6InFxIn0.iqoD8F2Z4EuQdtDshLMVy6qnc_EwwgV-Clze3PgRjsA"