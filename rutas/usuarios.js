'use strict'

//se manejarántodas las rutas para funciones con usuarios...


var Usuarios = require('../modelos/usuarios');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoosePagination = require('mongoose-pagination');
var express = require('express');
var UsuariosControlador = require('../controladores/usuarios');
//..para salir del dir, cargar fichero usuarios
var api= express.Router();
var md_auth = require('../authentication/authenticate');

//crear rutas para la api y se le pone el método get o post




api.get('/test-controller',  UsuariosControlador.test);

//registrar un nuevo usuario
api.post('/registra_usuarioc', (req,res)=>{
    var usuarios = new Usuarios();
    var params=req.query;
    console.log(params);
    usuarios.nombre = params.nombre;
    usuarios.apellidos = params.apellidos;
    usuarios.password = params.password;
    usuarios.tipo = params.tipo;
    usuarios.correo = params.correo;
    usuarios.usuario = params.usuario;


    if (params.password) {
        //Encriptar password aqui
        bcrypt.hash(params.password, null, null, function (err, hash) {
            usuarios.password = hash;
            if (usuarios.nombre != "" && usuarios.apellidos != "" && usuarios.tipo != "" && usuarios.correo != "" && usuarios.usuario != "") {
                //guardar user
                console.log('si todos')
                usuarios.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: "Error al guardar..." });

                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: "No se guardo..." });
                        } else {
                            res.status(200).send({ usuarios: userStored, message: "Se ha guardado correctamente" });

                        }
                    }
                });

            } else {
                console.log('no todos')
                res.status(404).send({ message: "Llenar todos los campos..." });
            }
        });
    } else {
        console.log('no pass')
        res.status(404).send({ message: 'Introduce la contraseña' });
    }
});


//consultar
api.post('/buscar_usuarios',(req, res)=>{
    console.log('buscando usuarios')
    Usuarios.find({}).sort({_id:-1}).exec(function(err, result) {
        var json={}
        for(var i = 0; i < result.length;i++){
            var arreglo={}
            arreglo['_id']=result[i]._id;
            arreglo['nombre']=result[i].nombre;
            arreglo['apellidos']=result[i].apellidos;
            arreglo['tipo']=result[i].tipo;
            arreglo['correo']=result[i].correo;
            arreglo['usuario']=result[i].usuario;

            json[i]=arreglo
        }
       
        if (err) throw err;
            return res.status(200).send({resultado_consulta:json});
      });
})


//para editar usuarioss
api.post('/mostrar_edicion_usuario', (req,res)=>{
    var params=req.query;
    console.log(params.id_usuario)
    Usuarios.findById(params.id_usuario,(error, usuarios)=>{
        if(error){
            res.status(500).send({message:'No se ha podido realizar la peticion'+error});
        }else{
            if(!usuarios){
                res.status(404).send({message:'No se encontro el usuario'});

            }else{
                console.log('entro else de bien'+ usuarios)
                res.status(200).send({nombre:usuarios.nombre, apellidos:usuarios.apellidos, tipo: usuarios.tipo, correo: usuarios.correo, usuario: usuarios.usuario, message:true, id_usuario:usuarios._id });
            }
        }
    });
});
//ok
//confirmar editar
api.put('/confirmar_edicion_usuario', (req, res) => {
    Usuarios.findByIdAndUpdate(req.query.id_usuario,{nombre:req.query.nombre, apellidos:req.query.apellidos, tipo: req.query.tipo, correo: req.query.correo, usuario: req.query.usuario},
        (error, usuarioUpdate) => {
            if(error){
                res.send({message:'No se ha podido realizar la petición'+error});
            }else{
                if(!usuarioUpdate){
                    res.send({message:'No se encontro el usuario'});
    
                }else{
                    res.send({MensajeActualizado:"El usuario ha sido actualizado correctamente",check:true});
    
                }
            }
    });
});

//para borrar usuarios

api.delete('/confirmar_delete_usuario', (req, res) => {
    console.log(req.query);
    Usuarios.findByIdAndRemove(req.query.id_usuario,
        (error, usuarioDelete) => {
            if(error){
                res.status(500).send({message:'No se ha podido realizar la peticion'+error});
            }else{
                if(!usuarioDelete){
                    res.status(404).send({message:'No se encontro el usuario'});
    
                }else{
                    res.status(200).send({MensajeBorrado:"El usuario ha sido borrado correctamente",check:true});
    
                }
            }
    });
});


api.post('/login', UsuariosControlador.validarLogIn);









//le agregamos el md_auth porque debe estar autenticado


module.exports = api;


//token usado: 