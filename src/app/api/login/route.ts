
import { User } from "@/libs/model/user";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import express from 'express'
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcrypt');
import { cookies } from 'next/headers'

const router = express.Router();

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(ConnectionString);
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connectToDatabase();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email: reqBody.email });

    if (!user) {
      return NextResponse.json({ postMessage: "User not Found!" }, { status: 404 });
    }

    const passwordMatch = await bcryptjs.compare(reqBody.password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ postMessagse: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, "afucentTech", { expiresIn: "1h" });

    console.log("before getting token");

    const response1 = NextResponse.next()
    cookies().set("token",token,{
      // httpOnly: true,
          maxAge: 3600, 
    });
       
    
    const responseData = { user, token };
    return NextResponse.json({ responseData})

  } catch (error:any) {
    console.error("Error occurred while processing request:", error);
    return NextResponse.json({ postMessage: "Error Occurred while logging in", success: false, error: error.message }, { status: 500 });
  }
}
