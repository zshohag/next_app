// "use client";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const { data: session } = useSession();
//   const [orders, setOrders] = useState([]);

//   const loadData = async () => {
//     if (!session?.user?.email) return;
//     try {
//       const res = await fetch(
//         `http://localhost:3000/my-orders/api/${session.user.email}`
//       );
//       const data = await res.json();
//       console.log(data);
//       setOrders(data?.myOrders || []);
//     } catch (error) {
//       console.error("Failed to load orders:", error);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [session]);

//   return (
//     <div className="min-h-screen mt-14 p-3">
//       <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-3">
//         <table className="table w-full">
//           {/* Table Head */}
//           <thead>
//             <tr>
//               <th className="text-sm">NAME</th>
//               <th className="text-sm  sm:table-cell">IMAGE</th>
//               <th className="text-sm">PRICE</th>
//               <th className="text-sm  sm:table-cell">DATE</th>
//               <th className="text-sm">ACTIONS</th>
//             </tr>
//           </thead>
//           {/* Table Body */}
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order, index) => (
//                 <tr key={order._id} className="text-sm">
//                   <td>{index + 1}</td>
//                   <td>
//                     <div className="flex items-center gap-1">
//                       <div>
//                         <div className="font-bold">{order.productName}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className=" sm:table-cell">
//                     <div className="avatar">
//                       <div className="mask mask-circle h-12 w-12">
//                         <Image
//                           src={order.image || "/placeholder.png"}
//                           alt={order.productName}
//                           width={48}
//                           height={48}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td>{order.price} USD</td>
//                   <td className=" sm:table-cell">{order.date || "N/A"}</td>
//                   <td>
//                     <button className="btn btn-ghost btn-xs">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading"; // Adjust the import path if necessary

const Page = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const loadData = async () => {
    if (!session?.user?.email) return;
    try {
      setLoading(true); // Start loading
      const res = await fetch(
        `http://localhost:3000/my-orders/api/${session.user.email}`
      );
      const data = await res.json();
      setOrders(data?.myOrders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    loadData();
  }, [session]);

  if (loading) {
    return <Loading />; // Show the loading spinner
  }

  return (
    <div className="min-h-screen mt-14 bg-white ">
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
                  <td>{index + 1}</td> {/* Order number from index */}
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
                  <td>${order.price}</td>
                  <td className="text-sm">{order.date || "N/A"}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button className="btn btn-ghost bg-black text-white btn-xs">
                        Edit
                      </button>
                      <button className="btn btn-ghost btn-xs">Delete</button>
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
