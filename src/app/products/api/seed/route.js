import { connectDB } from "@/lib/connectDB";
import { products } from "@/lib/products";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const productsCollection = db.collection("products");

    // Clear existing data in the collection
    await productsCollection.deleteMany();

    // Insert the new data
    const result = await productsCollection.insertMany(products);

    return NextResponse.json({
      message: "Seeded Successfully",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json(
      { message: "Error seeding data", error: error.message },
      { status: 500 } // Return a 500 status code for server errors
    );
  }
};
