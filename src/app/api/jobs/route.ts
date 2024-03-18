import { Job} from "@/libs/model/job";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'

 mongoose.connect(ConnectionString);

export async function GET(request: NextRequest, response: NextResponse) {
  try {
   
    let token:any= cookies().get("token")
    let VerifyToken = token.value
    console.log(VerifyToken);

    
    const data = await Job.find();
    return NextResponse.json({ result: data });

  } catch (error) {

    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    let token:any= cookies().get("token")
    let VerifyToken = token.value
    console.log(VerifyToken);

    const decodedToken = jwt.verify(VerifyToken, "afucentTech");
    console.log(decodedToken);

    const verifyAdmin = decodedToken.role !=="admin"


       if(!decodedToken){
           console.log("token is not valid ");
       }else if(verifyAdmin){
           return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
       }
       console.log("before getting payload")

    const payload = await request.json();
    console.log(payload);
    console.log("after getting payload")

    let job =await new Job(payload);
    console.log(job);

    // Save the job
    let result = await job.save();
    console.log(result);
    console.log('Request Body:', request.body);
    return NextResponse.json({ result, success: true });

  } catch (error) {

    console.error('Error saving job:', error);
    return NextResponse.json({ error: 'Error saving job' }, { status: 500 });
    
  }
}












