require('../connection')

const Pair = require('../modelos/Pair')

async function main(){
    const pairs = await Pair.find()
    console.log(pairs)
}
//consulta de los pares 
main()