const mongoose=require('mongoose');

const psotSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comment:String,
    userID:String,
     name:String
},{
    versionKey:false
})


const PostModel=mongoose.model("user",psotSchema);

module.exports={
    PostModel,
}