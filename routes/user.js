const express =  require('express')
const router = express.Router()
const {handleUserSignUp,handleUserLogin,handleUserDetail,handleUserLogout} = require('../controller/user')
const isAuthenticated = require('../middlewares/auth')

router.post('/signup',handleUserSignUp)

router.post('/login',handleUserLogin)

router.get('/logout',handleUserLogout)

router.get('/me',isAuthenticated,handleUserDetail)


module.exports = router