"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const CheckoutPage = ({ product, params }) => {
  //console.log("params",params.id);
  //console.log("product",product._id);
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [confirmedQuantity, setConfirmedQuantity] = useState(""); // Empty initially

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    if (value > product.stock) {
      setQuantity(product.stock); // Limit to max stock
    } else if (value < 1) {
      setQuantity(1); // Ensure minimum value is 1
    } else {
      setQuantity(value);
    }
  };

  const handleConfirmQuantity = () => {
    setConfirmedQuantity(quantity); // Update confirmed quantity
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newOrder = {
      ...data,
      email: session?.user?.email,
      name: session?.user?.name,
      productName: product.name,
      productID: product._id,
      category: product.category,
      image: product.image,
      price: product.price,
      quantity: confirmedQuantity, // Use confirmed quantity
    };
    console.log(newOrder);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/new-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Order Created",
          text: result.message,
        });
        reset();
        setConfirmedQuantity(""); // Reset confirmed quantity
      } else {
        throw new Error(result.message || "Failed to place order");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-3 mt-10">
      <div className="w-32">
        <Link href="/">
          <span className="btn btn-sm bg-gray-200 text-black flex items-center gap-2">
            <FiArrowLeft size={20} className="text-gray-800 hover:text-black" />
            Go Back
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Left Side: Product Details */}
        <div>
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-auto max-h-80 object-contain p-3"
          />

          <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
          <p className="text-xl text-gray-800 font-semibold mt-2">
            Price: ${product.price}
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Available Stock: {product.stock}
          </p>

          <div className="mt-3 flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 rounded-none text-black px-3"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="input w-16 text-center border-none focus:ring-0 focus:outline-none py-2"
              />

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) => Math.min(product.stock, prev + 1))
                }
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 rounded-none text-black px-3"
              >
                +
              </button>
            </div>

            {/* Confirm Quantity Button */}
            <button
              type="button"
              onClick={handleConfirmQuantity}
              className="btn btn-sm bg-black text-white"
            >
              Confirm Quantity
            </button>
          </div>
        </div>

        {/* Right Side: Order Form */}
        <div className="p-4 max-w-lg">
          <h2 className="text-xl font-semibold mb-3">Order Form</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              {/* User Name (Read-only) */}
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  value={session?.user?.name || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email (Read-only) */}
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Quantity and Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Confirmed Quantity */}
                <div className="form-control">
                  <label className="label">Quantity</label>
                  <input
                    type="number"
                    value={confirmedQuantity}
                    readOnly
                    className="input input-bordered w-full"
                    placeholder="Confirm quantity to add"
                  />
                </div>

                {/* Phone Number */}
                <div className="form-control">
                  <label className="label">Phone</label>
                  <input
                    type="text"
                    {...register("phone", { required: "Phone is required" })}
                    placeholder="Enter your phone number"
                    className="input input-bordered w-full"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Date Field */}
              <div className="form-control">
                <label className="label">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]} // Set current date
                  {...register("date", { required: "Date is required" })}
                  className="input input-bordered w-full"
                />
                {errors.date && (
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>

              {/* Present Address */}
              <div className="form-control">
                <label className="label">Present Address</label>
                <textarea
                  {...register("presentAddress", {
                    required: "Present Address is required",
                  })}
                  placeholder="Enter your present address"
                  className="textarea textarea-bordered w-full"
                />
                {errors.presentAddress && (
                  <p className="text-red-500">
                    {errors.presentAddress.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn bg-black hover:text-black text-white w-full mt-1"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
