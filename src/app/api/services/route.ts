import { NextRequest, NextResponse } from "next/server";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { Service } from "@/libs/model/service";

async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }

  
export async function GET() {
    let data=[]
    try {
        // Check the current state of the mongoose connection
        if (mongoose.connection.readyState === 0) {
            console.log("Connecting to MongoDB...");
            await mongoose.connect(ConnectionString);
            console.log("MongoDB connected.");
        } else {
            console.log("MongoDB connection already established.");
        }

        const data = await Service.find();
        return NextResponse.json({ result: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        // Return an error response
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}

export async function POST (request: NextRequest, response: NextResponse){
 
  connectToDatabase();    
  const payload=await request.json()
  let service = new Service(payload); 
  let result= await service.save();
   console.log('Request Body:', request.body);
    return NextResponse.json({result, success:true});
}
