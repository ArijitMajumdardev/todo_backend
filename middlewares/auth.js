const jwt = require('jsonwebtoken');
const User = require('../model/user')

async function isAuthenticated(req,res,next){
    const {token} = req.cookies;

    if(!token) {
        return res.status(404).json({
            status : false,
            message:"Login First"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET) 

    const user = await User.findById(decoded._id)

    req.user = user ;
    next()

}


module.exports = isAuthenticated