import { Team } from "@/libs/model/team";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
// import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'

  async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }

  export async function POST (request: NextRequest, response: NextResponse){
    
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
    const result = await  Team.deleteOne(record);
    return NextResponse.json({result,success:true})

  }