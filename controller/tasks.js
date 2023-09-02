const { ErrorHandler } = require("../middlewares/errorMiddlewarea");
const Tasks = require("../model/tasks");




async function addNewTask(req,res,next){

  try {
    const {task , description} = req.body;

    await Tasks.create({
        task,
        description,
        user:req.user,
    })

    res.status(201).json({
        success:"true",
        message:"Task Added Sucessfully"
    })
    
  } catch (error) {
    next(error)
  }
}



async function getMyTasks(req,res,next){
    try {
        
        const userId = req.user._id
const tasks  = await Tasks.find({user:userId});

res.status(200).json({
    success:true,
    tasks,
})

    } catch (error) {
        
        next(error)
    }

}


async function updateTask(req,res,next){
   try {
    
    const id = req.params.id;

    const task = await Tasks.findById(id);

    if(!task) return  next(new ErrorHandler("Invalid Id",404))


    task.isCompleted = !task.isCompleted

    await task.save();

    res.status(200).json({
    success:true,
    message:"Task Updated Successfully"

    })
   } catch (error) {
    next(error)
   }

}

async function deleteTask(req,res,next){
        try {
            
    const id = req.params.id;

    const task = await Tasks.findById(id);
    if(!task) return  next(new ErrorHandler("Invalid Id",404))

    await task.deleteOne()

    res.status(200).json({
    success:true,
    message:"Task Deleted"

    })
        } catch (error) {
            
            next(error)
        }
}





module.exports = {
    addNewTask,getMyTasks,updateTask,deleteTask
}