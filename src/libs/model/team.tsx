import mongoose from "mongoose";
const teamModel = new mongoose.Schema({
    name:String,
    design:String,
    description:String
})
export const Team = mongoose.models.teams || mongoose.model("teams",teamModel);