// "use client";
// import { getProductDetails } from "@/products/getProducts";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";

// const CheckoutPage = ({ params }) => {
//   const { data } = useSession();
//   const [product, setProduct] = useState({});
//   const { _id, title, description, image, price } = product || {};

//   const { register, handleSubmit, reset } = useForm();

//   // Load product details using useCallback
//   const loadProduct = useCallback(async () => {
//     const details = await getProductDetails(params.id);
//     setProduct(details.product);
//   }, [params.id]);

//   // Handle order submission
//   const onSubmit = async (formData) => {
//     const order = {
//       ...formData,
//       email: data?.user?.email,
//       name: data?.user?.name,
//       productTitle: title,
//       productID: _id,
//       price: price,
//     };

//     try {
//       const resp = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/checkout/api/new-order`,
//         {
//           method: "POST",
//           body: JSON.stringify(order),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const response = await resp.json();

//       if (resp.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Order Confirmed",
//           text: response?.message,
//           confirmButtonText: "OK",
//         });
//         reset(); // Reset the form
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Order Failed",
//           text:
//             response?.message || "An error occurred while placing the order.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Server Error",
//         text: error.message || "Something went wrong. Please try again later.",
//       });
//     }
//   };

//   useEffect(() => {
//     loadProduct();
//   }, [loadProduct]); // Include loadProduct in the dependency array

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Left side: Product Image */}
//         <div className="relative h-80">
//           <Image
//             className="absolute h-full w-full left-0 top-0 object-cover rounded-xl"
//             src={image}
//             alt="product"
//             width={1920}
//             height={1080}
//           />
//         </div>

//         {/* Right side: Checkout Form */}
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="form-control">
//                 <label className="label text-lg font-medium text-gray-700">
//                   <span className="label-text">Name</span>
//                 </label>
//                 <input
//                   defaultValue={data?.user?.name}
//                   {...register("name")}
//                   type="text"
//                   className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label text-lg font-medium text-gray-700">
//                   <span className="label-text">Date</span>
//                 </label>
//                 <input
//                   defaultValue={new Date().toISOString().split("T")[0]}
//                   {...register("date")}
//                   type="date"
//                   className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label text-lg font-medium text-gray-700">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   defaultValue={data?.user?.email}
//                   readOnly
//                   {...register("email")}
//                   type="text"
//                   className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label text-lg font-medium text-gray-700">
//                   <span className="label-text">Due Amount</span>
//                 </label>
//                 <input
//                   defaultValue={price}
//                   readOnly
//                   {...register("price")}
//                   type="text"
//                   className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label text-lg font-medium text-gray-700">
//                   <span className="label-text">Phone</span>
//                 </label>
//                 <input
//                   required
//                   {...register("phone", { required: true })}
//                   type="text"
//                   placeholder="Your Phone"
//                   className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label text-lg font-medium text-gray-700">
//                   <span className="label-text">Present Address</span>
//                 </label>
//                 <input
//                   {...register("address", { required: true })}
//                   type="text"
//                   placeholder="Your Address"
//                   className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="form-control mt-6">
//               <input
//                 className="btn btn-primary btn-block text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
//                 type="submit"
//                 value="Order Confirm"
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


"use client";
import { getProductDetails } from "@/products/getProducts";
import { useState, useEffect } from "react";

const CheckoutPage = ({ params }) => {
  const [product, setProduct] = useState({});

  const loadProduct = async () => {
    const details = await getProductDetails(params.id);
    setProduct(details.product); // Use setProduct instead of setService
  };

  useEffect(() => {
    loadProduct();
  }, [params]);

  const { _id, name, image, price } = product || {};
  console.log(name)

  return (
    <div>
      <p>{_id}</p>
      <h1>{name}</h1>
    </div>
  );
};

export default CheckoutPage;

