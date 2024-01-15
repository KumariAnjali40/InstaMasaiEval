const express=require('express');
const {auth}=require('../middleware/auth.middleware');
const {PostModel}=require('../models/psot.model');

postRouter=express.Router();

postRouter.use(auth);

//get



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

//update
postRouter.patch('/update/:postID',async(req,res)=>{
    const {postID} = req.params;
    const payload=req.body;
    try{
       const post=await PostModel.findOne({_id:postID});
       if(post.userID===req.body.userID){
          await PostModel.findByIdAndUpdate({_id:postID},payload);
          res.status(200).json({msg:"post has been updated"});
       }else{
          res.status(200).json({msg:"you are not having permission"});
       }
    }
    catch(err){
       console.log(err);
       res.status(400).json({err:err});
    }
 })

//delete
postRouter.delete('/delete/:postID',async(req,res)=>{
    const {postID} = req.params;
    try{
       const post=await PostModel.findOne({_id:postID});
       if(post.userID===req.body.userID){
          await PostModel.findByIdAndDelete({_id:postID});
          res.status(200).json({msg:"post has been deleted"});
       }else{
          res.status(200).json({msg:"your are not having permission"});
       }
    }
    catch(err){
       console.log(err);
       res.status(400).json({err:err});
    }
 })
 


module.exports={
    postRouter,
}