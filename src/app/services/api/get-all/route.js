import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const productsCollection = db.collection("products");

    // Fetch all products and convert cursor to an array
    const products = await productsCollection.find().toArray();

    return NextResponse.json({
      message: "Products fetched successfully",
      products, // Return the fetched products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 } // Return a 500 status code for server errors
    );
  }
};
