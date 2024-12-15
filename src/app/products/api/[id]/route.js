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

// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";
// import  ObjectId  from 'mongodb'; // Import ObjectId from 'mongodb'

// export const GET = async (request, { params }) => {
//   try {
//     const db = await connectDB();
//     const productsCollection = db.collection("products");

//     // Convert params.id to a MongoDB ObjectId
//      const productId = new ObjectId(params.id);

//     //const productId = new ObjectId(params.id.toString());

//     // Fetch the single product
//     const product = await productsCollection.findOne({ _id: productId });
//     console.log(product)

//     if (!product) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 } // Return a 404 if product not found
//       );
//     }

//     // Instead of nesting under `product`, return it directly
//     return NextResponse.json({
//       message: "Product fetched successfully",
//       product, // Return the product directly, not nested under `product`
//     });
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return NextResponse.json(
//       { message: "Error fetching product", error: error.message },
//       { status: 500 } // Return a 500 status code for server errors
//     );
//   }
// };
