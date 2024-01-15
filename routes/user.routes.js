const express=require('express');

const {UserModel}=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {BlackListModel}=require('../models/blacklist.model')

const userRouter=express.Router();

//register

userRouter.post('/register',async(req,res)=>{
    const {name,email,pass,age,city,gender}=req.body;

    try{
        const user=await UserModel.findOne({email:email});
        console.log(user);
        console.log(email);
        if(user){
            return res.status(400).json({msg:"user already register"})
        }
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(400).json({err:err});
            }else{
                const user1=new 
            }
        })
    }
    catch(err){
        res.status(400).json({msg:err});
    }
})