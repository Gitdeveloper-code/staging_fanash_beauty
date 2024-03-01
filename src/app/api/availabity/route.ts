import { NextRequest, NextResponse } from "next/server";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { Availability } from "@/libs/model/availability";



export async function GET() {
  let data=[]
  try {
      // Check the current state of the mongoose connection
     
      const data = await Availability.find();
      return NextResponse.json({ result: data });
  } catch (error) {
      console.error('Error fetching data:', error);
      // Return an error response
      return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

// export async function POST (request: NextRequest, response: NextResponse){

// connectToDatabase();    
// const payload=await request.json()
// let availability = new Availability(payload); 
// let result= await availability.save();
//  console.log('Request Body:', request.body);
//   return NextResponse.json({result, success:true});
// }
    