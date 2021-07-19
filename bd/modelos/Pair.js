const {Schema, model} = require('mongoose'); //me traigo solo esto del mongoose

const pairSchema = new Schema({ //el schema es para mongoose y el model es lo q entiende la base de datos
    code: {
        type: Number,
        unique: true, //unico
        required: true //obligatorio
    },
    url: {
        type: String,
        default: ''
    }
})



module.exports = model('Pair',pairSchema);