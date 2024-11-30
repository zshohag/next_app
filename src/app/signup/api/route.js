

import { connectDB } from "@/lib/connectDB"; // Adjust the import path as needed
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { password, confirmPassword, ...otherUserData } = await request.json();
    
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const db = await connectDB();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const exist = await usersCollection.findOne({ email: otherUserData.email });
    if (exist) {
      return NextResponse.json({ message: "User Exists" }, { status: 409 });
    }

    // Hash the password and store the new user
    const hashedPassword = bcrypt.hashSync(password, 12);
    await usersCollection.insertOne({ ...otherUserData, password: hashedPassword });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Something Went Wrong", error }, { status: 500 });
  }
};

