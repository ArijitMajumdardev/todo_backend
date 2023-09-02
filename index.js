const express =  require('express')
const connectToDb = require('./connection')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/tasks')
const {errorHandling} = require('./middlewares/errorMiddlewarea')
const cors = require('cors')

const dotenv =  require('dotenv');
const cookieParser = require('cookie-parser');


dotenv.config({
    path : "./data/config.env"
})


const app = express() ;

connectToDb();


//middlewares
// app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))





app.use('/api/v1/user',userRouter);
app.use('/api/v1/tasks',taskRouter);

app.use(errorHandling)
app.listen(process.env.PORT,()=>(console.log(`server is running on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`))) 