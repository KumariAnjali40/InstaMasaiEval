const jwt=require('jsonwebtoken');
const {UserModel}=require('../models/user.model');
const {BlackListModel}=require('../models/blacklist.model');

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];

    console.log(token);
    if(await BlackListModel.findOne({token})){
        return res.json({msg:"You have been logged out"});
    }

    if(token){
        try{
           const decoded=jwt.verify(token, "Anjali");
           if(decoded){
            req.body.userID=decoded.userID
            req.body.name=decoded.user
            next();
           }else{
            res.json({msg:"not authorzied"});
           }
        }
        catch(err){
            res.status(400).json({msg:"You Don't have token"});
            console.log(err);
        }
    }
}


module.exports={
    auth,
}