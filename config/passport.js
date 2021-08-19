const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

module.exports = function(passport) {// passport guarda los datos en una sesion
    passport.serializeUser( function (user,done){
        done(null, user.id);
    });
    
    passport.deserializeUser( function (id,done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });
    //con esto me registro
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function (req, username, password, done){
        User.findOne({'local.username' : username}, function (err,user){
            if (err) {return done(err);}
            if (user){
                console.log(user);
                return done(null,false,req.flash('registerMessage', 'Nombre de usuario ya existente.'));
            }else{
                var usuario = new User();
                usuario.local.username= username;
                usuario.local.password = usuario.generateHash(password);
                usuario.save(function(err){
                    if (err) {throw err;}
                    return done(null,usuario);
                });
            }
        });
    }
    ));

     //con esto me logeo
     passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function (req, username, password, done){
        User.findOne({'local.username' : username}, function (err,user){
            if (err) {return done(err);}
            if (!user){
                //console.log("hola");
                return done(null,false,req.flash('loginMessage', 'Nombre de usuario no existente.'));
            }
            if(!user.validatePassword(password)){
                return done(null,false,req.flash('loginMessage', 'Contraseña incorrecta'));
            }else{
                return done(null,user);
            }
        });
    }
    ));
}