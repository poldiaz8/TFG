const mongoose = require('mongoose'); //me traigo solo esto del mongoose
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//el schema es para mongoose y el model es lo q entiende la base de datos

const userSchema = new Schema({ 
    local:{
        username: String,
        password: String,
    admin:{ 
        type: Boolean,
        default:false,
        }
    }
});



//Metodos mongoose

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);