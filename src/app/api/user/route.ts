import { User } from "@/libs/model/user";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
// const jwt = require('jsonwebtoken');
const bcryptjs = require('bcrypt');


async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }

  export async function POST (request: NextRequest, response: NextResponse){
    try{
      connectToDatabase();    
      
      const reqBody=await request.json();
      const {uname,email,password} =reqBody ;
      const hash = await bcryptjs.hash(reqBody.password,10);
      console.log(hash)

      console.log(reqBody)
      let user = await User.create({uname,email,password:hash});

      let result= await user.save();
      console.log('Request Body:', result);
      return NextResponse.json({postMessage: "User Registered", success:true,result:result}, {status:201});

    }
    catch(error){

      return NextResponse.json({postMessage: "Error Occured while registering ", success:false}, {status:500});
    
    }
 
   
   }


   export async function GET() {
    let data=[];
    let success=true;
    try {
        
            await mongoose.connect(ConnectionString);
           const data = await User.find();
      
   
        return NextResponse.json({result:data, success });

    } catch (error) {

        console.error('Error fetching data:', error);
        return NextResponse.json({ result: 'Error fetching data', success:false });
    }
}

