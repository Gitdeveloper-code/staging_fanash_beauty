import { Team } from "@/libs/model/team";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'



  async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }

   export async function GET(request: NextRequest, response: NextResponse) {
    let data = [];
    let success = true;
    try {
      

        // Proceed with fetching data
        await connectToDatabase();
        data = await Team.find();
    } catch (error) {
        console.error('Error fetching data:', error);
        success = false;
    }

    // Return the response
    return NextResponse.json({ result: data, success });
  }

  //POST method

  export async function POST (request: NextRequest, response:NextResponse){   
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
   
      await connectToDatabase();    
         console.log("before getting payload")
         const reqBody = await request.json();
         
         console.log("after getting payload")
      console.log('Received Payload:', reqBody);
  
      let team = await new Team(reqBody); 
  
      let result= await team.save();
  
       return NextResponse.json({result, success:true});
      } catch (error) {
        // console.error(error.message)
        console.error('Error sending data:', error);
        return NextResponse.json({ error: 'Error occurred while Posting teams data' }, { status: 500 });
      }
  }
  
  



    
  
