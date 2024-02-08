const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        unique:true
    },
    roll:{
        type:Number
    }
})

const User = new mongoose.model("User" , UserSchema)

module.exports = {User}