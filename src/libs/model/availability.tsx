import mongoose from "mongoose";
const availabilityModel = new mongoose.Schema({
    time:String,
    availability:String,
})
export const Availability = mongoose.models.timeslots || mongoose.model("timeslots",availabilityModel);