const mongoose = require('mongoose')

const db = mongoose.connection;

mongoose.connect('mongodb+srv://admin:12345@cluster0.5elcn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
    
})
    .catch(err => console.log(err));
    
db.once('open', _ => { //esto solo ocurre una vez cuand ose abre la conexion
    console.log('Conectado correctamente a la base de datos');
})
    
