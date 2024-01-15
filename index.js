const express=require('express');
const app=express();



app.use(express.json());



app.listen(4500,(res,req)=>{
    console.log("Server is running at port 4500")
})