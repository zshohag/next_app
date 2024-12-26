// import { connectDB } from "@/lib/connectDB"
// import { NextResponse } from "next/server";

// export const GET = async (request, {params}) => {
//     const db =await connectDB()
//     const ordersCollection = db.collection('orders')
//     try {
//         const myOrders = await ordersCollection.find({email : params.email}).toArray();
//         return NextResponse.json({myOrders})
//     } catch (error) {
//         return NextResponse.json({message : "No Data Found"})
//     }
// }

import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const ordersCollection = db.collection("orders");

  try {
    // Validate email in params
    if (!params.email) {
      return NextResponse.json(
        { message: "Email parameter is required" },
        { status: 400 } // Bad Request
      );
    }

    // Fetch orders for the given email
    const myOrders = await ordersCollection.find({ email: params.email }).toArray();

    if (!myOrders.length) {
      return NextResponse.json(
        { message: "No orders found for the given email" },
        { status: 404 } // Not Found
      );
    }

    return NextResponse.json(
      { message: "Orders fetched successfully", myOrders },
      { status: 200 } // Success
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders", error: error.message },
      { status: 500 } // Internal Server Error
    );
  }
};
