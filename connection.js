const mongoose = require('mongoose')

 async function connectToDb(){
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"todo_db"
    }).then((c)=>{
        console.log(`db connected ${c.connection.host}`)
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports = connectToDb