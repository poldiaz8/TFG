require('../connection')

const Pair = require('../modelos/Pair')

async function updatePair(){
    const pair = await Pair.update({code:'1'},{
        url:'pepito'
    });
    console.log(pair)
}

async function find&update(){
    const pair = await Pair.findOneAndUpdate({code:'1'},{
        url: 'holi'
    })
}

updatePair();