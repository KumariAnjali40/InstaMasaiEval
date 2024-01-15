const express=require('express');
const {auth}=require('../middleware/auth.middleware');
const {PostModel}=require('../models/psot.model');

postRouter=express.Router();

postRouter.use(auth);




postRouter.post('/add',async(req,res)=>{
    try{
        const post=new PostModel(req.body);
        await post.save();
        res.status(200).json({msg:"new post added"});
    }
    catch(err){
        res.status(400).json({msg:"new post added"})
    }
})

postRouter.get('/posts',async(req,res)=>{
    try{
        const post=await PostModel.find({userID:req.body.userID});

        res.status(200).json({post});
      }
      catch(err){
         res.status(400).json({err});
      }
})






module.exports={
    postRouter,
}