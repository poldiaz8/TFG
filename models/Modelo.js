const mongoose = require('mongoose'); //me traigo solo esto del mongoose
const Schema = mongoose.Schema;

const modeloSchema = new Schema({ 
    code: {
        type: Number,
        unique: true, 
        required: true, 
        trim:true 
    },
    url: {
        type: String,
        default: '',
        trim:true
    }
});

module.exports = mongoose.model('Modelos', modeloSchema)




