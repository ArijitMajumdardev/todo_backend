const mongoose = require('mongoose')

 async function connectToDb(url){
    mongoose.connect(url).then(()=>{
        console.log("db connected")
    })
}

module.exports = connectToDb