const express =  require('express')
const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isCompleted:{
        type: Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"uesrs"
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }

   
})

const Tasks = mongoose.model("tasks",taskSchema);

module.exports = Tasks ;