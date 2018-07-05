'use strict'

//se manejarántodas las rutas para funciones con proveedor...
var Proveedor = require('../modelos/proveedor');
var express = require('express');
var jwt = require('../services/jwt');
var mongoosePagination = require('mongoose-pagination');
var ProveedorControlador = require('../controladores/proveedor');
//..para salir del dir, cargar fichero proveedor
var api= express.Router();
var md_auth = require('../authentication/authenticate');
//crear rutas para la api y se le pone el método get o post






api.post('/guardarProv', ProveedorControlador.guardarProv);
//api.post('/consultarProv', md_auth.ensureAuth, ProveedorControlador.consultarProv);
api.put('/updateProv', md_auth.ensureAuth, ProveedorControlador.updateProv);
//api.delete('/deleteProv', md_auth.ensureAuth, ProveedorControlador.deleteProv);


//funciones
api.post('/registra_proveedor', (req,res)=>{
    var proveedor = new Proveedor();
    var params=req.query;
    console.log(params)
    proveedor.nombre=params.nombre;
    proveedor.apellidos=params.apellidos;
    proveedor.empresa=params.empresa;

    if(proveedor.nombre!=null && proveedor.apellidos!=null && proveedor.empresa!=null ){
        proveedor.save((err,proveedortored)=>{
            if(!err){
                if(!proveedortored){
                    res.status(404).send({message:'No se ha registrado al proveedor'});
                }else{
                    res.status(200).send({proveedor:proveedortored, message:'Proveedor registrado exitosamente',status:true})
                    console.log(proveedortored)
                }
            }else{
                res.status(500).send("Error al guardar el proveedor");
            }
        })
    }else{
        res.status(200).send({message:'Introduce los datos necesarios'})
    }
});
//consultar
api.post('/buscar_proveedor',(req, res)=>{
    console.log('buscando proveedor')
    Proveedor.find({}).sort({_id:-1}).exec(function(err, result) {
        var json={}
        for(var i = 0; i < result.length;i++){
            var arreglo={}
            arreglo['_id']=result[i]._id;
            arreglo['nombre']=result[i].nombre;
            arreglo['apellidos']=result[i].apellidos;
            arreglo['empresa']=result[i].empresa;
          
            json[i]=arreglo
        }
       
        if (err) throw err;
            return res.status(200).send({resultado_consulta:json});
      });
});


//actualizar


//para editar proveedors
api.post('/mostrar_edicion_proveedor', (req,res)=>{
    var params=req.query;
    console.log(params.id_proveedor)
    Proveedor.findById(params.id_proveedor,(error, proveedor)=>{
        if(error){
            res.status(500).send({message:'No se ha podido realizar la peticion'+error});
        }else{
            if(!proveedor){
                res.status(404).send({message:'No se encontro el proveedor'});

            }else{
                console.log('entro else de bien'+ proveedor)
                res.status(200).send({nombre:proveedor.nombre, apellidos:proveedor.apellidos, empresa: proveedor.empresa, message:true, id_proveedor:proveedor._id });
            }
        }
    });
});
//ok
//confirmar editar
api.put('/confirmar_edicion_proveedor', (req, res) => {
    console.log(req.query.id_proveedor)
    Proveedor.findByIdAndUpdate(req.query.id_proveedor,{nombre:req.query.nombre, apellidos:req.query.apellidos, empresa: req.query.empresa},
        (error, proveedorUpdate) => {
            console.log(proveedorUpdate)
            if(error){
                res.send({message:'No se ha podido realizar la petición'+error});
                
            }else{
                if(!proveedorUpdate){
                    res.send({message:'No se encontro el proveedor'});
                    
    
                }else{
                    res.send({MensajeActualizado:"El proveedor ha sido actualizado correctamente",check:true});
                   
    
                }
            }
    });
});

//para borrar proveedor

api.delete('/confirmar_delete_proveedor', (req, res) => {
    console.log(req.query);
    Proveedor.findByIdAndRemove(req.query.id_proveedor,
        (error, proveedorDelete) => {
            if(error){
                res.status(500).send({message:'No se ha podido realizar la peticion'+error});
            }else{
                if(!proveedorDelete){
                    res.status(404).send({message:'No se encontro el proveedor'});
    
                }else{
                    res.status(200).send({MensajeBorrado:"El proveedor ha sido borrado correctamente",check:true});
    
                }
            }
    });
});


















//le agregamos el md_auth porque debe estar autenticado


module.exports = api;


//token usado: 