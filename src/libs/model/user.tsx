import mongoose from "mongoose";
const userModel = new mongoose.Schema({
    uname:String,
    email:String,
    contact:String,
    password:String,

})
export const User = mongoose.models.users || mongoose.model("users",userModel);