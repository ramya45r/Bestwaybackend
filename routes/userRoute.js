const express =require('express');
const { createuserCtrl,loginuser,userlist,alluserlist} = require('../controller/userController');


const userRoute =express.Router();

userRoute.post('/',createuserCtrl);
userRoute.post('/login',loginuser);
userRoute.get('/',alluserlist);

module.exports =userRoute;