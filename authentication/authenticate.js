'use strict'


var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

//comprobar si los datos son correctos o no del login
exports.ensureAuth = function(req, res, next){
//next para salir
if(!req.headers.authorization){
    return res.status(403).send({message: "La peticion no tiene la cabecera de autenticacion"});
}
var token = req.headers.authorization.replace(/['"]+/g, '');
//para eliminar las comillas al token
try{
    var payload = jwt.decode(token, secret);

    if(payload.exp <= moment().unix()){
        return res.status(401).send({message: "El token ha expirado"});
    }

}catch(ex){
    console.log(ex);
    return res.status(404).send({message: "Token no válido"});

}

//para tener todos los datos del usuario guardados en el token
req.usuarios = payload;
next();
//saliendo del middleware se usara en rutas para no acceder sino esta logueado


};
