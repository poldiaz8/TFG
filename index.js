const express = require('express');
const server = express();

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

 


const flash = require('connect-flash');




//lo mismo que un import


//Body parser para lerr los formularios
server.use(bodyParser.json());


//conectar mongo
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://admin:12345@cluster0.5elcn.mongodb.net/TFG?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

require('./config/passport')(passport);

//Habilitar ejs
server.set('view engine','ejs');
// Carpeta para las vistas
server.set('views',path.join(__dirname,'./views'));

//Cargar los archivos estaticos en public
server.use(express.static('public'));

//middleware

server.use(bodyParser.urlencoded({extended:true}));
server.use(session({
    secret: 'hola',
    resave: false,
    saveUninitialized: false
}));
server.use(flash());
server.use(passport.initialize());
server.use(passport.session());
server.use(morgan('dev'));
server.use(cookieParser());

//Definir las rutas de la applicacion

//server.use('/',routes());
server.use('/',require('./router/index.js')(server,passport));
//require('./router')(server,passport);


server.listen('3000', function() {
    console.log('Servidor web escuchando en el puerto 3000');
  });
/*
server.set('port',process.env.PORT || 3000);

server.listen(server.get('port'), () => {
    console.log('Server on port' ,server.get('port'))
})
*/