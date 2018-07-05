'use strict'

//se manejarántodas las rutas para funciones con usuarios...

var Cuentabancaria = require('../modelos/cuentabancaria');
var express = require('express');
var cuentaBancariaControlador = require('../controladores/cuentabancaria');
//..para salir del dir, cargar fichero usuarios
var api= express.Router();
var md_auth = require('../authentication/authenticate');

/*crear rutas para la api y se le pone el método requerido, con el noCuenta de la funcion creada en el controlador.
api.get('/testcb', md_auth.ensureAuth, cuentaBancariaControlador.testcb);
api.get('/consultacbid/:id', md_auth.ensureAuth, cuentaBancariaControlador.getcbById);
api.get('/consultacb/:id?', cuentaBancariaControlador.getcb);
api.post('/registrocb', cuentaBancariaControlador.guardarCuentabancaria);
api.put('/actualizarcb/:id', md_auth.ensureAuth, cuentaBancariaControlador.actualizarcb);
api.delete('/borrarcb/:id', md_auth.ensureAuth, cuentaBancariaControlador.borrarcb);

*/

//funciones
api.post('/registra_cuentabancaria', (req,res)=>{
    var cuentabancaria = new Cuentabancaria();
    var params=req.query;
    console.log(params)
    var createdAt=new Date();
    cuentabancaria.noCuenta=params.noCuenta;
    cuentabancaria.banco=params.banco;

    if(cuentabancaria.noCuenta!=null && cuentabancaria.banco!=null ){
        cuentabancaria.save((err,cuentabancariaStored)=>{
            if(!err){
                if(!cuentabancariaStored){
                    res.status(404).send({message:'No se ha registrado la cuenta bancaria'});
                }else{
                    res.status(200).send({cuentabancaria:cuentabancariaStored, message:'Cuenta bancaria registrada exitosamente',status:true})
                    console.log(cuentabancariaStored)
                }
            }else{
                res.status(500).send("Error al guardar la cuenta bancaria");
            }
        })
    }else{
        res.status(200).send({message:'Introduce los datos necesarios'})
    }
});
//consultar
api.post('/buscar_cb',(req, res)=>{
    console.log('buscando cb')
    Cuentabancaria.find({}).sort({_id:-1}).exec(function(err, result) {
        var json={}
        for(var i = 0; i < result.length;i++){
            var arreglo={}
            arreglo['_id']=result[i]._id;
            arreglo['noCuenta']=result[i].noCuenta;
            arreglo['banco']=result[i].banco;
          
            json[i]=arreglo
        }
       
        if (err) throw err;
            return res.status(200).send({resultado_consulta:json});
      });
});
//actualizar


//para editar cbs
api.post('/mostrar_edicion_cuentabancaria', (req,res)=>{
    var params=req.query;
    console.log(params.id_cuentabancaria)
    Cuentabancaria.findById(params.id_cuentabancaria,(error, cuentabancaria)=>{
        if(error){
            res.status(500).send({message:'No se ha podido realizar la peticion'+error});
        }else{
            if(!cuentabancaria){
                res.status(404).send({message:'No se encontro la cuentabancaria'});

            }else{
                console.log('entro else de bien'+ cuentabancaria)
                res.status(200).send({noCuenta:cuentabancaria.noCuenta, banco:cuentabancaria.banco, message:true, id_cuentabancaria:cuentabancaria._id });
            }
        }
    });
});

//confirmar editar
api.put('/confirmar_edicion_cb', (req, res) => {
    console.log(req.query.idCuentabancaria)
    Cuentabancaria.findByIdAndUpdate(req.query.idCuentabancaria,{noCuenta:req.query.noCuenta, banco:req.query.banco},
        (error, cuentabancariaUpdate) => {
            console.log(cuentabancariaUpdate)
            if(error){
                res.send({message:'No se ha podido realizar la petición'+error});
                
            }else{
                if(!cuentabancariaUpdate){
                    res.send({message:'No se encontró la cuenta bancaria'});
                    
    
                }else{
                    res.send({MensajeActualizado:"La cuenta bancaria ha sido actualizada correctamente",check:true});
                   console.log(cuentabancariaUpdate)
    
                }
            }
    });
});

//para borrar cbs

api.delete('/confirmar_delete_cuentabancaria', (req, res) => {
    console.log(req.query);
    Cuentabancaria.findByIdAndRemove(req.query.id_cuentabancaria,
        (error, id_cuentabancariaDelete) => {
            if(error){
                res.status(500).send({message:'No se ha podido realizar la peticion'+error});
            }else{
                if(!cuentabid_cuentabancariaDelete){
                    res.status(404).send({message:'No se encontro el cuentabid_cuentabancaria'});
    
                }else{
                    res.status(200).send({MensajeBorrado:"El cuentabid_cuentabancaria ha sido borrado correctamente",check:true});
    
                }
            }
    });
});








//api.put('/actualiza-cb/:id', md_auth.ensureAuth, cuentaBancariaControlador.actualizarUsuario);
//le agregamos el md_auth porque debe estar autenticado


















module.exports = api;