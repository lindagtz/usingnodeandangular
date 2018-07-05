/*var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
Usuarios= require('mongoose').model('usuarios');


module.exports=function(){
passport.use(new LocalStrategy(function(username, password, done){

    Usuarios.findOne({
        username: correo
    }, function(err, usuarios){
        if(err){
            return done(err);
    }
if (!usuarios){
    return done(null,false, {
        message: 'Unknown user'
    });
}
if(!usuarios.authenticate(password)){
    return done(null, s)
}



)



}))




}