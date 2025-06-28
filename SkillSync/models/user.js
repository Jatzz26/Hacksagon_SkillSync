const mongoose = require("mongoose")
const Schema=mongoose.Schema
const userSchema=new Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        sem:
        {
            type:Number,
            min:1,
            max:8,
            required:true
        },
        EnrNmber:{
            type:String,
            required:true,
            unique:true
        },
        skills:{
            type:String,
            enum: [
    "Web Development",
    "Data Science",
    "Robotics",
    "App Development",
    "Cybersecurity",
    "Machine Learning",
    "Cloud Computing",
    "DevOps",
    "Game Development",
    "Blockchain Technology",
    "Artificial Intelligence",
    "Internet of Things (IoT)"],
            required:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true
        },
       
        password:
        {
            type:String,
            required:true
        },
    
    })


    const User=mongoose.model("User",userSchema)
module.exports=User;