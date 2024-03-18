import { Job} from "@/libs/model/job";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'
mongoose.connect(ConnectionString);

export async function GET() {
  try {

    

    // Fetch data
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

    const payload = await request.json();
    let job = new Job(payload);
    // Save the job
    let result = await job.save();
    console.log('Request Body:', request.body);
    return NextResponse.json({ result, success: true });

  } catch (error) {

    console.error('Error saving job:', error);
    return NextResponse.json({ error: 'Error saving job' }, { status: 500 });
    
  }
}

export async function DELETE(request:any,content:any) {

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

    const productId = content.params.id;
   const  record = {_id:productId} ;
   await mongoose.connect(ConnectionString);
    const result = await  Job.deleteOne(record);
    return NextResponse.json({result,success:true})

  }










