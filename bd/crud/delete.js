require('../connection')

const Pair = require('../modelos/Pair')

const deleteFunction = async () => {
    //const deleted = await Pair.deleteMany({code:'1'}) //elimina todos q cumplan eso
    //const deleted = await Pair.findOneAndDelete({code:'1'}) //busca todos y elimina uno
    const deleted = await Pair.deleteOne({code:'1'})  solo busca uno
    console.log(deleted)
}

deleteFunction();