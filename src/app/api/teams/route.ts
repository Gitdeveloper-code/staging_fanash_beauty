import { Team } from "@/libs/model/team";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }

  export async function POST (request: NextRequest, response: NextResponse){
 
    connectToDatabase();    
    const payload=await request.json()
    let team = new Team(payload); 
    let result= await team.save();
    console.log('Request Body:', request.body);
    return NextResponse.json({result, success:true});
   }

   export async function GET() {
    let data=[];
    let success=true;
    try {
        // Check the current state of the mongoose connection
      
            await mongoose.connect(ConnectionString);
           const data = await Team.find();
      
   
        return NextResponse.json({result:data, success });

    } catch (error) {
        console.error('Error fetching data:', error);
        // Return an error response
        return NextResponse.json({ result: 'Error fetching data', success:false });
    }
}