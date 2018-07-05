'use strict'

//lo que necesitamos 
const express = require('express');
var bodyparser=require('body-parser');
var app = express();
const path = require('path');//rutas
var ejs = require('ejs');
var flash = require ('connect-flash');
var session = require('express-session');
var passport=require('passport');
//CONFIGURACIÓN DE USO DE FRAMEWORK

//cargar rutas



//Rutas
var usuario_rutas = require('./rutas/usuarios');
var b_gastos_rutas = require('./rutas/b_gastos');
var cb_rutas = require('./rutas/cuentabancaria');
var dep_rutas = require('./rutas/depositos');
var estimacion_rutas = require('./rutas/estimacion');
var obras_rutas = require('./rutas/obras');
var proveedor_rutas = require('./rutas/proveedor');
var obra_detalle_rutas = require('./rutas/obra-detalle');
var public_routes=require('./rutas/index');



const bodyParser = require('body-parser');//para peticiiones post
const morgan = require('morgan');

//llamando a las dependencias que usamos
var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));



app.use(session({ cookie: { maxAge: 3000000 }, 
        secret: 'woot',
        resave: false, 
        saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));



//aqui tenemos todas las vistas y redirecciones
app.get('/', (req, res) => {
        res.render('login');
});

app.get('/home', (req, res) => {
        res.render('home.ejs');
});

app.get('/usuarios', (req, res) => {
        res.render('usuarios.ejs');
});
app.get('/prov', (req, res) => {
        res.render('proveedores.ejs');
});


app.get('/obras', (req, res) => {
        res.render('obras.ejs');
});

app.get('/ctab', (req, res) => {
        res.render('cb.ejs');
});
app.get('/gastos', (req, res) => {
        res.render('gastos.ejs');
});
app.get('/reportes', (req, res) => {
        res.render('reportes.ejs');
});


//cabeceras HTTP






//middlewares para permitir hacer peticiones desde el front al back
// Add headers
app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });




//Rutas base
app.use('/api', usuario_rutas);
app.use('/api', b_gastos_rutas);
app.use('/api', cb_rutas);
app.use('/api', dep_rutas);
app.use('/api', estimacion_rutas);
app.use('/api', obras_rutas);
app.use('/api', proveedor_rutas);
app.use('/api', obra_detalle_rutas);

app.use('/', public_routes);






module.exports = app;