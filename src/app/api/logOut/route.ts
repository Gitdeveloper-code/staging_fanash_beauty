import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { ConnectionString } from '@/libs/mongodb';
import mongoose from "mongoose";

import { cookies } from 'next/headers';

export async function POST(req: NextRequest, response: NextResponse) {
  try {
   
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }

    // Clear the token cookie
    cookies().delete('token'); 
    
   return NextResponse.json({ message: 'Successfully logged out' },{status:200});

  } catch (error) {

    console.error('Error during logout:', error);

   return NextResponse.json({ message: 'Failed to log out' },{status:500}); 
  }
}
