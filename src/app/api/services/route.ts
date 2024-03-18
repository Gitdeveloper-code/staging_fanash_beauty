import { IncomingMessage } from 'http';
import { NextFunction } from 'express';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { Service } from "@/libs/model/service";
import { User } from "@/libs/model/user";
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcrypt');
import { cookies } from 'next/headers'

async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(ConnectionString);
    }
}



export  async function GET(request: NextRequest, response: NextResponse) {
    try {
   
        await connectToDatabase();
        const data = await Service.find();
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
        const verifyAdmin = decodedToken.role !=="admin"


        if(!decodedToken){
            console.log("token is not valid ");
        }else if(verifyAdmin){
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
        }

        console.log("token is  valid ");

        await connectToDatabase();
    const reqBody = await request.json();

        
        let service = new Service(reqBody);
        const result = await service.save();

        // return res.status(200).json({ result, success: true });
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return NextResponse.json({ error: 'Error occurred while Posting Service' }, { status: 500 });

    }
}














// import { NextRequest, NextResponse } from "next/server";
// import { ConnectionString } from "@/libs/mongodb";
// import mongoose from "mongoose";
// import { Service } from "@/libs/model/service";
// import {Session} from 'next-auth'
// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// async function connectToDatabase() {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(ConnectionString);
//     }
//   }
  
// export async function GET() {
//     let data=[]
//     try {
//         // Check the current state of the mongoose connection
//         if (mongoose.connection.readyState === 0) {
//             console.log("Connecting to MongoDB...");
//             await mongoose.connect(ConnectionString);
//             console.log("MongoDB connected.");
//         } else {
//             console.log("MongoDB connection already established.");
//         }

//         const data = await Service.find();
//         return NextResponse.json({ result: data });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         //  Return an error response
//         return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
//     }
// }

// export async function POST (request: NextRequest, response: NextResponse){
 
//   connectToDatabase();    
//   const payload=await request.json()
//   let service = new Service(payload); 
//   let result= await service.save();
//    console.log('Request Body:', request.body);
//     return NextResponse.json({result, success:true});
// }
