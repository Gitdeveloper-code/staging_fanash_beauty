import { User } from "@/libs/model/user";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }

  export async function POST (request: NextRequest, response: NextResponse){
    try{
      connectToDatabase();    
      const payload=await request.json()
      let user = new User(payload); 
      let result= await user.save();
      console.log('Request Body:', request.body);
      return NextResponse.json({postMessage: "User Registered", success:true}, {status:201});

    }
    catch(error){
      return NextResponse.json({postMessage: "Error Occured while registering ", success:false}, {status:500});


    }
 
   
   }

   export async function GET() {
    let data=[];
    let success=true;
    try {
        // Check the current state of the mongoose connection
      
            await mongoose.connect(ConnectionString);
           const data = await User.find();
      
   
        return NextResponse.json({result:data, success });

    } catch (error) {
        console.error('Error fetching data:', error);
        // Return an error response
        return NextResponse.json({ result: 'Error fetching data', success:false });
    }
}

