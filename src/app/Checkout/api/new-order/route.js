// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const POST = async (request) => {
//   try {
//     // Parse the incoming JSON data
//     const newOrder = await request.json();

//     // Validate the incoming data
//     if (!order || Object.keys(order).length === 0) {
//       return NextResponse.json(
//         { message: "Invalid order data" },
//         { status: 400 } // Bad Request
//       );
//     }
 
//     // Connect to the database
//     const db = await connectDB();
//     const ordersCollection = db.collection("orders");

//     // Insert the order into the database
//     const result = await ordersCollection.insertOne(newOrder);

//     // Check if the insertion was successful
//     if (!result.acknowledged) {
//       throw new Error("Failed to create order in the database");
//     }

//     // Return a success response
//     return NextResponse.json(
//       {
//         message: "Order created successfully",
//         orderId: result.insertedId, // Return the inserted order's ID
//       },
//       { status: 201 } // Created
//     );
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       {
//         message: "Error creating order",
//         error: error.message,
//       },
//       { status: 500 } // Internal Server Error
//     );
//   }
// };
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // Parse the incoming JSON data
    const newOrder = await request.json();

    // Validate the incoming data
    if (!newOrder || Object.keys(newOrder).length === 0) {
      return NextResponse.json(
        { message: "Invalid order data" },
        { status: 400 } // Bad Request
      );
    }
 
    // Connect to the database
    const db = await connectDB();
    const ordersCollection = db.collection("orders");

    // Insert the order into the database
    const result = await ordersCollection.insertOne(newOrder);

    // Check if the insertion was successful
    if (!result.acknowledged) {
      throw new Error("Failed to create order in the database");
    }

    // Return a success response
    return NextResponse.json(
      {
        message: "Order created successfully",
        orderId: result.insertedId, // Return the inserted order's ID
      },
      { status: 201 } // Created
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        message: "Error creating order",
        error: error.message,
      },
      { status: 500 } // Internal Server Error
    );
  }
};
