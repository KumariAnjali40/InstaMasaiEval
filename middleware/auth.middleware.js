const jwt=require('jsonwebtoken');
// const {UserModel}=require('../models/user.model');
const {BlackListModel}=require('../models/blacklist.model');

const auth=async(req,res,next)=>{
    const token1=req.headers.authorization?.split(" ")[1];
    const blackToken =await BlackListModel.findOne({access_token:token1})


    if(token1){
        if(blackToken){
            return res.json({msg:"You have been logged out"});
        }
        try{
            const decoded=jwt.verify(token1,"Anjali")
            if(decoded){
                req.body.userID=decoded.userID
                req.body.name=decoded.name
                console.log(decoded);
                next();
            }else{
                res.json({msg:"You are not authorized"});
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