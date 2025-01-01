// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import Image from "next/image";

// const UpdateOrderPage = ({ params }) => {
//   const { data: session } = useSession();
//   const [order, setOrder] = useState(null); // Initialize as null for conditional rendering
//   const [loading, setLoading] = useState(true); // Track loading state

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const loadOrder = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/my-orders/api/order/${params.id}`
//       );

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log("Order Details:", result);

//       setOrder(result.data); // Set the order data

//       // Populate form with existing data
//       reset({
//         date: result.data.date || "",
//         phone: result.data.phone || "",
//         presentAddress: result.data.presentAddress || "",
//         productName: result.data.productName || "",
//         price: result.data.price || "",
//         quantity: result.data.quantity || "",
//       });
//     } catch (error) {
//       console.error("Failed to load order details:", error);
//     } finally {
//       setLoading(false); // Stop loading after the fetch is complete
//     }
//   };

//   const onSubmit = async (formData) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/my-orders/api/order/${params.id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log("Updated Order Details:", result);
//       alert("Order updated successfully!");
//     } catch (error) {
//       console.error("Failed to update order:", error);
//       alert("Failed to update the order. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (params?.id) {
//       loadOrder();
//     }
//   }, [params]);

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6">
//       <h1 className="text-2xl font-bold mb-4">Update Order Page</h1>
//       {loading ? (
//         <p>Loading order details...</p>
//       ) : order ? (
//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           {/* Left Side: Order Image */}
//           <div className="w-full md:w-1/2">
//             <Image
//               src={order.image || "/placeholder-image.jpg"}
//               alt={order.productName || "Order Image"}
//               width={300}
//               height={300}
//               className="w-full h-auto max-h-80 object-contain p-3"
//             />
//           </div>

//           {/* Right Side: Editable Form */}
//           <div className="w-full md:w-1/2">
//             <h2 className="text-xl font-semibold mb-4">Order Details</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <label className="block font-medium mb-1">Order ID:</label>
//                 <p className="border rounded-md p-2">{order._id}</p>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Product Name:</label>
//                 <p className="border rounded-md p-2">{order.productName}</p>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Date:</label>
//                 <input
//                   type="date"
//                   {...register("date", { required: "Date is required" })}
//                   className="w-full border rounded-md p-2"
//                 />
//                 {errors.date && (
//                   <p className="text-red-500 text-sm">{errors.date.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Phone Number:</label>
//                 <input
//                   type="text"
//                   {...register("phone", {
//                     required: "Phone number is required",
//                   })}
//                   className="w-full border rounded-md p-2"
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm">{errors.phone.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">
//                   Present Address:
//                 </label>
//                 <textarea
//                   {...register("presentAddress", {
//                     required: "Present Address is required",
//                   })}
//                   placeholder="Enter your present address"
//                   className="textarea textarea-bordered w-full"
//                 />
//                 {errors.presentAddress && (
//                   <p className="text-red-500 text-sm">
//                     {errors.presentAddress.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Quantity:</label>
//                 <input
//                   type="number"
//                   {...register("quantity", {
//                     required: "Quantity is required",
//                   })}
//                   className="w-full border rounded-md p-2"
//                 />
//                 {errors.quantity && (
//                   <p className="text-red-500 text-sm">
//                     {errors.quantity.message}
//                   </p>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
//               >
//                 Update Order
//               </button>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <p>Order not found.</p>
//       )}
//     </div>
//   );
// };

// export default UpdateOrderPage;


"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Swal from "sweetalert2";

const UpdateOrderPage = ({ params }) => {
  const { data: session } = useSession();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params?.id) {
      loadOrder();
    }
  }, [params]);

  const loadOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-orders/api/order/${params.id}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setOrder(result.data);

      // Populate form with existing data
      reset({
        date: result.data.date || "",
        phone: result.data.phone || "",
        presentAddress: result.data.presentAddress || "",
        productName: result.data.productName || "",
        price: result.data.price || "",
        quantity: result.data.quantity || "",
      });
    } catch (error) {
      console.error("Failed to load order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-orders/api/order/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Updated Order Details:", result);

      Swal.fire({
        icon: "success",
        title: "Order Updated",
        text: "The order has been updated successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Failed to update order:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update the order. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-3 mt-10">
      <h1 className="text-2xl font-semibold mb-4">Update Order Page</h1>

      {loading ? (
        <p>Loading order details...</p>
      ) : order ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left Side: Order Image */}
          <div>
            <Image
              src={order.image || "/placeholder-image.jpg"}
              alt={order.productName || "Order Image"}
              width={300}
              height={300}
              className="w-full h-auto max-h-80 object-contain p-3"
            />
          </div>

          {/* Right Side: Editable Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* <div>
                <label className="block font-medium mb-1">Order ID:</label>
                <p className="border rounded-md p-2">{order._id}</p>
              </div>  */}

              <div>
                <label className="block font-medium mb-1">Product Name:</label>
                <p className="border rounded-md p-2">{order.productName}</p>
              </div>

              <div>
                <label className="block font-medium mb-1">Date:</label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full border rounded-md p-2"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Phone Number:</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="w-full border rounded-md p-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Present Address:</label>
                <textarea
                  {...register("presentAddress", {
                    required: "Present Address is required",
                  })}
                  placeholder="Enter your present address"
                  className="textarea textarea-bordered w-full"
                />
                {errors.presentAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.presentAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Quantity:</label>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  className="w-full border rounded-md p-2"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              >
                Update Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  );
};

export default UpdateOrderPage;
