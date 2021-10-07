const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');
const multer = require('multer');
const mimeTypes = require('mime-types');
const User = require('../models/User');
const Modelo = require('../models/Modelo');

const storage = multer.diskStorage({
    destination: './public/modelos/',
    filename: function(req,file,cb){
        cb("",Date.now() + file.originalname.substring(file.originalname.lastIndexOf('.'))); 
    }                           //mimeTypes.extension(file.mimetype) nombrar el no soporte y que yo lo resolvi
})

const upload = multer({
    storage: storage
});

module.exports = (server,passport) => {
   router.get('/', modelController.home);

   router.get('/login', (req,res) => {
    res.render('login', {
        message: req.flash('loginMessage') //poder renderizar mensajes en esta vista
    });
});

    router.post('/login', async (req, res, next) => {
        
        let auxSuccess;

        var usuario = await User.findOne({'local.username' : req.body.username});
        
        if (usuario != null){
            if (usuario.local.admin){
                auxSuccess = '/index';
            }else{
                auxSuccess = '/indexUser';
            }
        }

        passport.authenticate('local-login', {
        //añadir mirar si es admin o si no
        successRedirect: auxSuccess,
        failureRedirect: '/login',
        failureFlash: true
        
    })(req, res, next);

});

    router.get('/register', (req,res) => {
        res.render('register', {
            message: req.flash('registerMessage') //poder renderizar mensajes en esta vista
        });
    });

    router.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/indexUser',
        failureRedirect: '/register',
        failureFlash: true
    }));

    router.get('/index',isLogged, (req,res) => {
        res.render('index');
    })

    router.get('/indexUser',isLogged, (req,res) => {
        res.render('indexUser');
    })

    router.post('/index', upload.single('url'),modelController.agregarModelo);
                            //tiene que coincidir con name del campo
    router.get('/modelo/:codigo',modelController.findCodigo);
 

    router.get('/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    });

    router.post('/ejemplo1', (req,res) => {
        res.render('ejemplo1');
    })

    router.post('/ejemplo2', (req,res) => {
        res.render('ejemplo2');
    })

    router.post('/ejemplo3', (req,res) => {
        res.render('ejemplo3');
    })

    return router;

    
}

function isLogged(req,res,next){
    if (req.isAuthenticated()){
       return next();
    }
    res.redirect('/');
}