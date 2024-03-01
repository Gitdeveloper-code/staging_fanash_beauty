import mongoose from "mongoose";
const bookingModel = new mongoose.Schema({
    date:String,
    time:String,
    service:String,
    email:String,
    contact:String,
    serviceType:[String]

})
export const Booking = mongoose.models.bookings || mongoose.model("bookings",bookingModel);