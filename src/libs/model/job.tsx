import mongoose from "mongoose";
const jobModel = new mongoose.Schema({
    category:String,
    design:String,
    time:String
})
export const Job = mongoose.models.jobs || mongoose.model("jobs",jobModel); 