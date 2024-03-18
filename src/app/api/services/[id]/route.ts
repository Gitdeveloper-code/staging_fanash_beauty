import { NextRequest, NextResponse } from "next/server";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { Service } from "@/libs/model/service";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'
const jwt = require('jsonwebtoken');

async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }
  
export async function GET() {
    let data=[]
    try {

        if (mongoose.connection.readyState === 0) {
            console.log("Connecting to MongoDB...");
            await mongoose.connect(ConnectionString);
            console.log("MongoDB connected.");
        } else {
            console.log("MongoDB connection already established.");
        }

        const data = await Service.find();
        return NextResponse.json({ result: data });

    } catch (error) {

        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
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
  let service = new Service(payload); 
  let result= await service.save();
   console.log('Request Body:', request.body);
    return NextResponse.json({result, success:true});
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

       console.log("token is  valid ");
    
    const productId = content.params.id;
   const  record = {_id:productId} ;
   await mongoose.connect(ConnectionString);
    const result = await  Service.deleteOne(record);
    return NextResponse.json({result,success:true})

  }

// export async function PUT(request: any, content: any) {
//     const productId = content.params.id;
//     // const updatedData = request.body;
//     // console.log(updatedData)
//     const record = { _id: productId };

//     try {
//         await mongoose.connect(ConnectionString);
//         const updatedData = await request.json();
//         console.log(updatedData)

//         let existingRecord = await Service.findById(productId);
        
//         if (!existingRecord) {
//             return new Response('Record not found', { status: 404 });
//         }
        
//         let existingRecord1 = await Service.findByIdAndUpdate(productId, updatedData).exec();
//         console.log(existingRecord1)
   
//         const result = await existingRecord1.save();
//         console.log(existingRecord1)
//         console.log(result)

//         return new Response(JSON.stringify({ result, success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
//     } catch (error) {
//         // Handle errors appropriately
//         console.error(error);
//         return new Response('Internal Server Error', { status: 500 });
//     }
// }

export async function PUT(request: any, content: any) {
    const productId = content.params.id;

    try {
        let token:any= cookies().get("token")
        let VerifyToken = token.value
        console.log(VerifyToken);
 
        const decodedToken = jwt.verify(VerifyToken, "afucentTech");
        console.log(decodedToken);
 
        if(!decodedToken){
            console.log("token is not valid ");
        }
        console.log("token is  valid ");
        
        await mongoose.connect(ConnectionString);
        const updatedData = await request.json();
        console.log(updatedData);

        let existingRecord = await Service.findByIdAndUpdate(productId, updatedData, { new: true }).exec();
        
        if (!existingRecord) {
            return new Response('Record not found', { status: 404 });
        }
   
        console.log(existingRecord); 

        return new Response(JSON.stringify({ result: existingRecord, success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
       
        console.error(error);
        return new Response('Internal Server Error', { status: 500 });
    }
}






