'use strict'
var csv = require("fast-csv");
var fs = require('fs');
//se manejarántodas las rutas para funciones con obras...

var csvfile = __dirname + "/../public/files/obras.csv";
var stream = fs.createReadStream(csvfile);

var express = require('express');
var moment = require('moment');
var ObrasControlador = require('../controladores/obras');
var Obras = require('../modelos/obras');
var Gastos = require('../modelos/b_gastos');
var Proveedor = require('../modelos/proveedor');
var Cuentabancaria = require('../modelos/cuentabancaria');




//..para salir del dir, cargar fichero obras
var api= express.Router();
var md_auth = require('../authentication/authenticate');

//crear rutas para la api y se le pone el método get o post


api.post('/guardarObra', md_auth.ensureAuth, ObrasControlador.guardarObra);
//api.post('/consultarObra', md_auth.ensureAuth, ObrasControlador.consultarObra);
api.post('/updateObra', md_auth.ensureAuth, ObrasControlador.updateObra);
//api.post('/deleteObra', md_auth.ensureAuth, ObrasControlador.deleteObra);


//al dar click en obra
api.get('/obra-detalle/:id', (req, res) => {
    var id_obra = req.params.id;
    var responseObject ={ message: "id: "+ id_obra};
    Obras.findById(id_obra).exec((err, obras) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
            console.log(obras)

        } else {
            if (!obras) {
                res.status(404).send({ message: "No existe la obra" });

            } else {
                res.render('obra-detalle.ejs', {Obra: obras});

                console.log(obras)

            }
        }
    })
        
  });

//consultar a los proveedores por su Id
api.get('/getProvById/:id', (req, res) => {
    var idProveedor = req.params.id;

    Proveedor.findById(idProveedor).exec((err, proveedor) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
            console.log(proveedor)

        } else {
            if (!proveedor) {
                res.status(404).send({ message: "No existe el proveedor" });

            } else {
                res.status(200).send({ Proveedor: proveedor });

                console.log(proveedor)

            }
        }
    })
        
  });


//no esta sirviendo...
  api.get('/consultaGastosbyIdObras/:id_obra', (req, res) => {
    var idObra = req.params.id_obra;
    var gasto= new Gastos();
    console.log('id es: '+idObra)

   
    return Gastos.findOne({ idObra: idObra})
    
    .populate({ path: 'idObra' }).exec((err, idObra) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición.." });
        } else {
            if (!gasto) {
                res.status(404).send({ message: "No hay gastos.." });

            } else {
                res.status(200).send({ gasto });
            }
        }
    });
        
  });
//pruebita
api.post('/consultaGastosbyIdObra/', (req, res) => {
    var id_Obra = req.query.id;
    console.log(id_Obra)
    if (!id_Obra) {
        console.log('no')
        var find= Gastos.find({}).sort('fecha_gasto');
    }else{
        var find= Gastos.find({idObra: id_Obra}).sort('fecha_gasto');
    }
    var pop= find.populate({path: 'idObra'})

    pop.populate({path:'idProveedor'}).exec((err, gasto)=>{
        if(err){
            res.status(500).send({ message: "Error en la petición.." });


        }else{
            if (!gasto) {
                res.status(404).send({ message: "No hay gastos.." });

            } else {
                console.log(gasto)
                res.status(200).send({resultado_consulta: gasto });
            }
        }
    });



});


//consultar los proveedores autocomplete


//2
api.get('/getProvs', function(req, res) {
    var regex = new RegExp(req.query["term"], 'i');
    var query = Proveedor.find({nombre: regex}, { 'nombre': 1 }).sort({"empresa":-1}).limit(5);
         
       // Execute query in a callback and return proveed list
   query.exec(function(err, proveedor) {
       if (!err) {
          // Method to construct the json result set
          res.send(proveedor, {'Content-Type': 'application/json'}, 200);

       } else {
          res.send(JSON.stringify(err), {
             'Content-Type': 'application/json'
          }, 404);
       }
    });
 });

 //getcbss autocomplete
 api.get('/getcbs', function(req, res) {
    var regex = new RegExp(req.query["term"], 'i');
    var query = Cuentabancaria.find({noCuenta: regex}, { 'noCuenta': 1 }).sort({"createdAt":-1}).limit(5);
         
       // Execute query in a callback and return proveed list
   query.exec(function(err, cuentabancaria) {
       if (!err) {
          // Method to construct the json result set
          res.send(cuentabancaria, {'Content-Type': 'application/json'}, 200);

       } else {
          res.send(JSON.stringify(err), {
             'Content-Type': 'application/json'
          }, 404);
       }
    });
 });  
//cbs para estimaciones

   

 

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

//funciones, sirve
api.post('/registra_gasto', (req,res)=>{
    var gasto = new Gastos();
    var params=req.query;
    console.log(params+'fsdfsfds');
  
      gasto.descripcion = params.descripcion;
      gasto.fecha_gasto = params.fecha_gasto;
      gasto.monto = params.monto;
      gasto.idProveedor = params.idProveedor;
      gasto.idCuentabancaria= params.idCuentabancaria;
      gasto.idObra = params.idObra;

  

            if(gasto.descripcion !=null && gasto.fecha_gasto !=null && gasto.monto !=null && gasto.idProveedor !=null && gasto.idCuentabancaria !=null){
                //guardar 
                gasto.save((err, gastoStored) => {
                    if(err){
                        res.status(500).send({message: "Error al guardar gasto..."});

                    }else{
                        if(!gastoStored){
                            res.status(404).send({message: "No se guardo el gasto..."});
                        }else{
                            res.status(200).send({gasto: gastoStored , message:'Gasto registrado exitosamente',status:true});

                        }
                    }
                });
            }else{
                res.status(200).send({message: "Llenar todos los campos..."});
            }
});
  

//consultar aun no usamosesto


api.get('/buscar_obra_detalle', function(req, res) {
    var id_obra = req.params.id;
    console.log('hajsnkjsa')
    alert('entra')


Obras.findById(id_obra).exec((err, obras) => {
    if (err) {
        res.status(500).send({ message: "Error en la petición" });
        console.log(obras)

    } else {
        if (!obras) {
            res.status(404).send({ message: "No existe la obra" });

        } else {
            res.render('obra-detalle.ejs',{Obra:obras});
            console.log(obras)
        }
    }
})
    
});






//editar obras



































module.exports = api;


//token usado: 
//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjEwMzBmZWM0ZmUxYzE1MTgwNGQ4MWIiLCJub21icmUiOiJMaW5kYSIsInRpcG8iOiJxcSIsImNvcnJlbyI6InFxIiwidXN1YXJpbyI6InFxIn0.iqoD8F2Z4EuQdtDshLMVy6qnc_EwwgV-Clze3PgRjsA"