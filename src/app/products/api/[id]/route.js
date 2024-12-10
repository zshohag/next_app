import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request,{params}) => {
  try {
    const db = await connectDB();
    const productsCollection = db.collection("products");

    // Fetch single product 
    const product = await productsCollection.findOne({_id : params.id});

    return NextResponse.json({
      message: "Product fetched successfully",
      product, // Return the fetched products
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Error fetching product", error: error.message },
      { status: 500 } // Return a 500 status code for server errors
    );
  }
};
