const Modelo = require('../models/Modelo');
const multer = require('multer');
const mimeTypes = require('mime-types');
var nombrefichero;

const storage = multer.diskStorage({
    destination: './public/modelos/',
    filename: function (req, file, cb) {
        cb("", Date.now() + file.originalname.substring(file.originalname.lastIndexOf('.')));
    } //mimeTypes.extension(file.mimetype) nombrar el no soporte y que yo lo resolvi
})

const upload = multer({
    storage: storage
});


exports.home = (req, res) => {
    res.render('login', {
        message: req.flash('loginMessage') //poder renderizar mensajes en esta vista
    });
}
exports.agregarModelo = async (req, res, next) => {
    //let respuesta;
    //upload.single('url'); problema gordo intentando coger el file name
    //console.log('./public/modelos/' + req.file.filename);
    
    const modelo = new Modelo({
        code: req.body.codigo,
        url: '/modelos/' + req.file.filename
    });
    console.log(modelo);
    var control = "0";
    try{

        let resultado = await modelo.save();

    }catch (error) {
        console.log(error);
        /*respuesta = {
            error: 400,
            error: 'Hubo un error'
        }*/
        control = "1";
    }
    //res.json(respuesta);
    //console.log(control);


    next();

    res.render('index', { auxError: control });
}

exports.findCodigo = async (req, res, next) => {
    
    const modelo = await Modelo.findOne({code: req.params.codigo});

    res.render('modelo', {
        modelo
    });
    
    next();
    // poner en el html para el modelo {{modelo.url}} para cceder a la direccion y ya
}