// app/api/users/route.js
import { NextResponse } from "next/server";

const users = []; // Temporary in-memory storage (use a database in production)

export async function GET() {
    // Return a simple message
    const message = { message: "Hello Users" };
  
    return NextResponse.json(message, { status: 200 });
  }

export async function POST(req) {
  try {
    const data = await req.json(); // Parse the request body
    const newUser = { id: Date.now(), ...data }; // Create a new user
    users.push(newUser); // Add the user to the array
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user", error: error.message },
      { status: 500 }
    );
  }
}
