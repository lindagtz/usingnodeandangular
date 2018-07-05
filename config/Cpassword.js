var passport = require('passport');
var bcrypt = require('bcryptjs');
var Usuarios = require('../modelos/usuarios');
var LocalStrategy = require('passport-local').Strategy;
mongoose= require('mongoose');

var isValidPassword = function (usuarios, password) {
    console.log(password)
    return bcrypt.compareSync(password, usuarios.password);
}

passport.serializeUser(function (usuarios, done) {
    done(null, usuarios._id);
});

passport.deserializeUser(function (id, done) {
    Usuarios.findById(id)
        .then((usuarios) => {
            if (!usuarios)
                done(null, false);
            done(null, usuarios);
        })
        .catch((err) => {
            done(err);
        });
});



passport.use('login', new LocalStrategy({
    
    passReqToCallback: true
    
},
    function (req, username, password, done) {
        
        Usuarios.findOne({ correo: username }).then((usuarios) => {
            console.log('entra')
            alert('entra')
            
            if (!usuarios) {
                return done(null, false, {
                    message: 'no user'
                });
            }
            //if (!usuarios.validado) {
                //return done(null, false, req.flash('error', 'Usuarios no validado.'))
            //}
            if (!isValidPassword(usuarios, password)) {
                alert('si existe prto correo mal')
                return done(null, false, {
                    message: 'contraseña invalida'
                });

            }
            
            return done(null, usuarios);
        })
            .catch((err) => {
                return done(err);
            });

    }
));





module.exports = passport;