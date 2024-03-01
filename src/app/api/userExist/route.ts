import { User } from "@/libs/model/user";
import { ConnectionString } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(ConnectionString);
    }
  }

 
  export async function GET(ab:any) {
    let success=true;

    try {
        console.log("Params Passed"+ ab)

        // Check the current state of the mongoose connection
        connectToDatabase()
        const data = await User.findOne({email:'pathanhuda80@gmail.com'});
        console.log(data)
        return NextResponse.json({result:data, success });

    } catch (error) {
        console.error('Error fetching data:', error);
        // Return an error response
        return NextResponse.json({ result: 'Error fetching data', success:false });
    }
}

