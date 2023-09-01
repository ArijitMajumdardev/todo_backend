const User = require('../model/user')
const bcrypt = require('bcrypt')
const {sendCookie} = require('../service/auth');
const jwt = require('jsonwebtoken');



async function handleUserSignUp(req,res){

    try {
        const {name, email ,password} = req.body;

    let user = await User.findOne({email})

    if(user) return  next(new ErrorHandler("User Already Exists",404))


    if(user){
        return res.status(404).json({
            status : false,
            message:"User Already Exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)

    user = await User.create({name, email, password:hashedPassword})


   sendCookie(user,res,"Registered Successfully",201)

        
    } catch (error) {
        next(error)
    }

}





async function handleUserLogin(req,res){

    try {
        
    const {email ,password} = req.body;


    let user = await User.findOne({email}).select("+password")

    if(!user) return  next(new ErrorHandler("Invalid Email or Password",404))

    const isMatch=  await bcrypt.compare(password,user.password);

    if(!isMatch) return  next(new ErrorHandler("Invalid Email or Password",404))

    sendCookie(user,res,`Welcome Back ${user.name}`,200);

        
    } catch (error) {
        next(error)
    }
}





 function handleUserDetail(req,res){

    const user = req.user;

    return res.status(200).json({
        status : true,
        user
    })
    

}


function handleUserLogout(req,res){

      
    res.status(200).cookie("token","",{
       expires: new Date(Date.now()),
       sameSite : process.env.NODE_ENV === "Developement"? lax : none,
       secure : process.env.NODE_ENV === "Developement"? false : true,
    }).json({
        success: true,
        message:"Successfully Logged Out"
    })
    
}



 


module.exports = {
    handleUserSignUp,handleUserLogin,handleUserDetail,handleUserLogout
}