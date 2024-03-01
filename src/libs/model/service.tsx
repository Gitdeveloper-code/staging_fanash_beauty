import mongoose from "mongoose";
const serviceModel = new mongoose.Schema({
    name:String,
    price:String,
    category:String
})
export const Service = mongoose.models.services || mongoose.model("services",serviceModel);