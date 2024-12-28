import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const ordersCollection = db.collection("orders");

  try {
    const result = await ordersCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully", response: result });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const db = await connectDB();
  const ordersCollection = db.collection("orders");

  try {
    const updateDoc = await request.json();
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...updateDoc } },
      { upsert: true }
    );

    if (result.matchedCount === 0 && !result.upsertedId) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order updated successfully", response: result });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const ordersCollection = db.collection("orders");

  try {
    const order = await ordersCollection.findOne({ _id: new ObjectId(params.id) });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order found", data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
