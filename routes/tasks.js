const express =  require('express')
const { addNewTask ,getMyTasks,updateTask,deleteTask} = require('../controller/tasks')
const isAuthenticated = require('../middlewares/auth')
const router = express.Router()

router.post('/new',isAuthenticated,addNewTask);

router.get('/my',isAuthenticated,getMyTasks);

router.route('/:id').put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);






module.exports = router
