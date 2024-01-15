const mongoose=require('mongoose');

const psotSchema=mongoose.Schema({
    title:String,
    body:String,
    device:{type:String,
        enum:["Laptop","Tablet","Mobile"],

    },
    no_of_comment:Number,
    userID:String,
     name:String
},{
    versionKey:false
})


const PostModel=mongoose.model("user",psotSchema);

module.exports={
    PostModel,
}