const express=require('express');

const {UserModel}=require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {BlackListModel}=require('../models/blacklist.model')

const userRouter=express.Router();

//register

userRouter.post('/register',async(req,res)=>{
    const {name,email,pass,gender,age,city}=req.body;

    try{
        const user=await UserModel.findOne({email});
        console.log(user);
         console.log(email);
       if(user){
        return res.status(400).json({msg:"user is already register"});
         }
        bcrypt.hash(pass,5,async(err,hash)=>{
           if(err){
            res.status(200).json({ error: err });
           }else{
            const user=new UserModel({name,email,pass:hash,gender,age,city});
            await user.save();
            console.log(user);
            res.status(200).json({msg:"Hey! user You are successfully Register"});
           }
        })
    }
    catch(err){
        res.status(400).json({msg:err});
    }
})


//login
userRouter.post('/login',async(req,res)=>{
 const {email,pass}=req.body;
 try{
    const user=await UserModel.findOne({email});
    if(user){
       bcrypt.compare(pass,user.pass,(err,result)=>{
        if(result){
            const access_token=jwt.sign({userID:user._id,user:user.name},"Anjali");

            res.json({msg:"Longin successfull",user,access_token})
        }else{
            res.json({msg:"wrong email "})
        }
       })
    }
 }
 catch(err){
    res.json({err});
 }
})


// //logout
userRouter.get('/logout',async(req,res)=>{
    const access_token=req.headers.authorization?.split(" ")[1];
    try{
        const blacklist=new BlackListModel({access_token:access_token});
        await blacklist.save();
        res.status(200).json({msg:"Hey! user you are logout"});
    }
    catch(err){
        res.status(400).json({err:err});
    }
})







module.exports={
    userRouter,
}