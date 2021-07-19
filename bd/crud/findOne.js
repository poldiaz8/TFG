require('../connection')

const Pair = require('../modelos/Pair')

async function getPair(){
    const pair = await Pair.findOne({code:'1'});
    console.log(pair)
}

getPair();