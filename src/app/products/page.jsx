// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// //import products from "../../../public/data.json";

// // const getProducts = async () => {
// //   try {
// //     const res = await fetch("http://localhost:3000/services/api/get-all");
// //     if (!res.ok) {
// //       throw new Error(`HTTP error! Status: ${res.status}`);
// //     }

// //     const products = await res.json(); // Await the resolution of the JSON
// //     console.log(products); // Now this logs the actual data
// //     return products;
// //   } catch (error) {
// //     console.error("Failed to fetch products:", error);
// //     return null; // Return null or an empty array as a fallback
// //   }
// // };

// //console.log(products);

// // eslint-disable-next-line @next/next/no-async-client-component
// const ProductHomePage = async () => {
//   // const getProducts = async () => {
//   //   try {
//   //     const res = await fetch("http://localhost:3000/services/api/get-all");
//   //     if (!res.ok) {
//   //       throw new Error(`HTTP error! Status: ${res.status}`);
//   //     }
//   //     const data = await res.json();
//   //     return data.products; // Return only the products array
//   //   } catch (error) {
//   //     console.error("Failed to fetch products:", error);
//   //     return []; // Return an empty array if fetching fails
//   //   }
//   // };

//   // const products = await getProducts();

//   return (
//     <div className="px-5 py-16 min-h-screen">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-10 ">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full"
//           >
//             <div className="flex flex-col items-center ">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={150}
//                 height={150}
//                 className="rounded"
//               />
//               <h3 className="text-lg font-semibold mt-4 text-center">
//                 {product.name}
//               </h3>
//               <p className="font-bold text-xl text-center text-blue-500">
//                 ${product.price}
//               </p>
//             </div>
//             <div className="flex justify-center  mx-auto w-3/4 mt-4">
//               <Link href={`/products/${product.id}`}>
//                 <button className=" btn btn-sm bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-200">
//                   View Details
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductHomePage;

// "use client";
// import { getProducts } from "@/services/getProducts";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const { products } = getProducts();
// console.log(products)

// const ProductHomePage = () => {
//   if (products?.length <= 0) {
//     return null;
//   }

//   return (
//     <div className="px-5 py-16 min-h-screen">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-10 ">
//         {products?.length > 0 &&
//           products?.map((product) => (
//             <div
//               key={product.id}
//               className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full"
//             >
//               <div className="flex flex-col items-center ">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={150}
//                   height={150}
//                   className="rounded"
//                 />
//                 <h3 className="text-lg font-semibold mt-4 text-center">
//                   {product.name}
//                 </h3>
//                 <p className="font-bold text-xl text-center text-blue-500">
//                   ${product.price}
//                 </p>
//               </div>
//               <div className="flex justify-center  mx-auto w-3/4 mt-4">
//                 <Link href={`/products/${product.id}`}>
//                   <button className=" btn btn-sm bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-200">
//                     View Details
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ProductHomePage;



///////////////////


// "use client";
// import { useEffect, useState } from "react";
// import { getProducts } from "@/services/getProducts";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const ProductHomePage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { products } = await getProducts(); // Fetch products
//         setProducts(products); // Update state
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts(); // Call the function
//   }, []); // Empty dependency array ensures it runs only once

//   if (products?.length <= 0) {
//     return null;
//   }

//   return (
//     <div className="px-5 py-16 min-h-screen">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-10">
//         {products?.map((product) => (
//           <div
//             key={product.id}
//             className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full"
//           >
//             <div className="flex flex-col items-center">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={150}
//                 height={150}
//                 className="rounded"
//               />
//               <h3 className="text-lg font-semibold mt-4 text-center">
//                 {product.name}
//               </h3>
//               <p className="font-bold text-xl text-center text-blue-500">
//                 ${product.price}
//               </p>
//             </div>
//             <div className="flex justify-center mx-auto w-3/4 mt-4">
//               <Link href={`/products/${product.id}`}>
//                 <button className="btn btn-sm bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-200">
//                   View Details
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductHomePage;






/////////////////////

// "use client";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";
// import Link from "next/link";
// import { getProducts } from "@/services/getProducts";
// import LoadingPage from "../loading";

// const ProductHomePage = () => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["products"],
//     queryFn: getProducts,
//   });

//   if (isLoading)
//     return (
//       <div>
//         <LoadingPage />
//       </div>
//     );
//   if (error) return <div>Error loading products: {error.message}</div>;
//   if (!data?.products?.length) return <div>No products found.</div>;

//   const products = data.products;

//   return (
//     <div className="px-5 py-16 min-h-screen">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-10">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full"
//           >
//             <div className="flex flex-col items-center ">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={150}
//                 height={150}
//                 className="rounded"
//               />
//               <h3 className="text-lg font-semibold mt-4 text-center">
//                 {product.name}
//               </h3>
//               <p className="font-bold text-xl text-center text-blue-500">
//                 ${product.price}
//               </p>
//             </div>
//             <div className="flex justify-center mx-auto w-3/4 mt-4">
//               <Link href={`/products/${product.id}`}>
//                 <button className="btn btn-sm bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-200">
//                   View Details
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductHomePage;


import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/services/products/getProducts";

const ProductHomePage = async () => {
  // Fetch products data server-side
  const { products } = await getProducts();

  // Handle empty product list
  if (products?.length <= 0) {
    return null;
  }

  return (
    <div className="px-5 py-16 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full"
          >
            <div className="flex flex-col items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                className="rounded"
              />
              <h3 className="text-lg font-semibold mt-4 text-center">
                {product.name}
              </h3>
              <p className="font-bold text-xl text-center text-blue-500">
                ${product.price}
              </p>
            </div>
            <div className="flex justify-center mx-auto w-3/4 mt-4">
              <Link href={`/products/${product._id}`}>
                <button className="btn btn-sm bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-200">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHomePage;
