const jwt=require('jsonwebtoken')
// const {UserModel}=require('../models/user.model');
const {BlackListModel}=require('../models/blacklist.model');

const auth=async(req,res,next)=>{
    const access_token=req.headers.authorization?.split(" ")[1];
    const blackToken =await BlackListModel.findOne({access_token:access_token})


    if(access_token){
        if(blackToken){
            return res.json({msg:"You have been logged out"});
        }
        try{
            const decoded=jwt.verify(access_token,"Anjali");
            req.body.userID=decoded.userID
            // const user=await UserModel.findOne({_id:userID});
            if(decoded){
                req.body.userID=decoded.userID
                req.body.name=decoded.name
                console.log(decoded)
                next()
            }else{
                res.json({msg:"you are not authorized"})
            }
        }
        catch(err){
            res.json({err})
        }
    }
}


module.exports={
    auth,
}