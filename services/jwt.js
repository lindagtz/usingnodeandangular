//para administrar los tokens, identificar en automatico las credenciales del user en toda la app
'use strict'


var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';
//para que caduque


exports.createToken = function(usuarios){
//tranportar la info del usuario logueado
    var payload = {
        sub: usuarios._id,
        nombre: usuarios.nombre,
        apellido: usuarios.apellido,
        tipo: usuarios.tipo,
        correo: usuarios.correo,
        usuario: usuarios.usuario,
        iat: moment().unix,
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);

};
