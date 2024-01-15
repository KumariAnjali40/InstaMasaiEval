const express=require('express');
const { connection } = require("./db");




const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

app.use('/users',userRouter);


app.get('/',(req,res)=>{
    res.send("welcome to my home");
})

app.listen(4500,async()=>{
    try{
       await connection
       console.log("connected to db");
       console.log("Server is running at port 4500");
    }catch(err){
        console.log(err);
    }
    
})