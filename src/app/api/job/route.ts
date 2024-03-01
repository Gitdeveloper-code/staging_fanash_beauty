import { NextRequest, NextResponse } from "next/server";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { Job } from "@/libs/model/job";



export async function GET() {
  let data=[]
  try {
      // Check the current state of the mongoose connection
      const data = await Job.find();
      return NextResponse.json({ result: data });
  } catch (error) {
      console.error('Error fetching data:', error);
      // Return an error response
      return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST (request: NextRequest, response: NextResponse){

const payload=await request.json()
let job = new Job(payload); 
let result= await job.save();
 console.log('Request Body:', request.body);
  return NextResponse.json({result, success:true});
}
    