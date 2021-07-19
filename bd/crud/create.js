require('./connection')

const Pair = require('./modelos/Pair')


async function create(codigo,direccion){
    const pair = new Pair({
        code: codigo,
        url: direccion
    })
    
    await pair.save();
    console.log(pair);
}
