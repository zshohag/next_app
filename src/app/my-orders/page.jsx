"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "@/app/loading";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    if (!session?.user?.email) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/my-orders/api/${session?.user?.email}`
      );
      const data = await res.json();
      setOrders(data?.myOrders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const deleted = await fetch(
          `http://localhost:3000/my-orders/api/order/${id}`,
          {
            method: "DELETE",
          }
        );
        const resp = await deleted.json();

        if (resp?.response?.deletedCount > 0) {
          loadData();
          await Swal.fire({
            title: "Deleted!",
            text: "The order has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } else {
          await Swal.fire({
            title: "Failed!",
            text: "The order could not be deleted. Please try again.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        console.error("Error during delete operation:", error);
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [session]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen mt-14 bg-white">
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>PRICE</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{order.productName}</td>
                  <td>
                    <div className="avatar">
                      <div className="h-12 w-12">
                        <Image
                          src={order.image || "/placeholder.png"}
                          alt={order.productName}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    ${order.price} <span className="font-bold"> x</span>{" "}
                    {order.quantity}{" "}
                  </td>
                  <td className="text-sm">{order.date || "N/A"}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Link href={`/my-orders/update/${order._id}`}>
                        <button className="btn btn-ghost bg-black text-white btn-xs">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
