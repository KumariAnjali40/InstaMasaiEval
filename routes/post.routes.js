const express=require('express');
const {auth}=require('../middleware/auth.middleware');
const {PostModel}=require('../models/psot.model');

postRouter=express.Router();

postRouter.post('/add',async(req,res)=>{
    try{
        const psot=new PostModel(req.body);
        await post.save();
        res.status(200).json({msg:"new post added"});
    }
    catch(err){
        res.status(400).json({msg:"new post added"})
    }
})




module.exports={
    postRouter,
}