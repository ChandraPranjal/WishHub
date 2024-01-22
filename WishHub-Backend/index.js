const express = require('express')
const server = express();

server.get('/',(req,res)=>{
    res.json("Hi");
})

server.listen(5000,()=>{
    console.log("Server Booted...");
})