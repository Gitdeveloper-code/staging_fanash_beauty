import { Job} from "@/libs/model/job";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


// async function connectToDatabase() {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(ConnectionString);
//     }
//   }

//   export async function POST (request: NextRequest, response: NextResponse){
 
//     connectToDatabase();    
//     const payload=await request.json()
//     let team = new Job(payload); 
//     let result= await team.save();
//     console.log('Request Body:', request.body);
//     return NextResponse.json({result, success:true});
//    }

//    export async function GET() {
//     let data=[];
//     let success=true;
//     try {
//         // Check the current state of the mongoose connection
      
//             await mongoose.connect(ConnectionString);
//            const data = await Job.find();
      
   
//         return NextResponse.json({result:data, success });

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         // Return an error response
//         return NextResponse.json({ result: 'Error fetching data', success:false });
//     }
// }
// // Connect to MongoDB

mongoose.connect(ConnectionString);

export async function GET() {
  try {
    // Fetch data
    const data = await Job.find();
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return an error response
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const payload = await request.json();
    let job = new Job(payload);
    // Save the job
    let result = await job.save();
    console.log('Request Body:', request.body);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error saving job:', error);
    // Return an error response
    return NextResponse.json({ error: 'Error saving job' }, { status: 500 });
  }
}












