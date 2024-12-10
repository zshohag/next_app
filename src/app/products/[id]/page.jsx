// import { getProductDetails } from "@/products/getProducts";

// const Page = async ({ params }) => {
//   // Await the params to get the `id`
//   //const { id } = params;

//   // Fetch product details using the `id`
//   const details = await getProductDetails(params.id);

//   // Check if the response is successful and the product exists
//   if (!details.success || !details.product) {
//     return <div>Product not found or an error occurred.</div>;
//   }

//   // Destructure the product name
//   const { name } = details.product;

//   return (
//     <div>
//       <p>Product ID: {id}</p>
//       <h1>Product Name: {name}</h1>
//     </div>
//   );
// };

// export default Page;





// import Image from "next/image";
// import Link from "next/link";
// import { getProductDetails } from "@/services/products/getProducts";

// const ProductDetailsPage = async ({ params }) => {
    

//   try {
//     // Fetch product details using the product ID
//     const response = await getProductDetails(params.id);
//     console.log(response)

//     if (!response.success) {
//       // Handle error if product fetching fails
//       return (
//         <div className="p-4 max-w-6xl mx-auto mt-24">
//           <h1 className="text-2xl font-bold text-center text-red-600">
//             {response.error || "Product not found"}
//           </h1>
//           <Link href="/">
//             <button className="btn btn-sm bg-gray-200 text-black mt-6 mx-auto block">
//               Go Back
//             </button>
//           </Link>
//         </div>
//       );
//     }

//     const product = response.product; // Extract product data

//     return (
//       <div className="p-4 max-w-6xl mx-auto mt-24">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Image Section */}
//           <div className="flex justify-center">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={300}
//               height={300}
//               className="w-full h-auto max-h-80 object-contain p-3 rounded-lg shadow-xl"
//             />
//           </div>

//           {/* Details Section */}
//           <div className="flex flex-col justify-center">
//             <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
//             <p className="text-lg mb-2">Price: ${product.price}</p>
//             <p className="text-lg mb-2">Category: {product.category}</p>
//             <p className="mb-4">{product.description}</p>
//             <p className="text-md mb-2">In Stock: {product.stock}</p>
//             <p className="text-md">
//               Ratings:{" "}
//               {Array.from({ length: Math.floor(product.ratings) }, () => "★").join("")}
//               {product.ratings % 1 !== 0 && "☆"}
//             </p>
//             <Link href="/">
//               <button className="btn btn-sm bg-gray-200 text-black mt-6">
//                 Go Back
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     // Handle unexpected errors
//     console.error("Error in ProductDetailsPage:", error);
//     return (
//       <div className="p-4 max-w-6xl mx-auto mt-24">
//         <h1 className="text-2xl font-bold text-center text-red-600">
//           An unexpected error occurred.
//         </h1>
//         <Link href="/">
//           <button className="btn btn-sm bg-gray-200 text-black mt-6 mx-auto block">
//             Go Back
//           </button>
//         </Link>
//       </div>
//     );
//   }
// };

// export default ProductDetailsPage;



import { getProductDetails } from "@/products/getProducts";
import Image from "next/image";
import Link from "next/link";

const ProductDetailsPage = async ({ params }) => {
  // Fetch products data server-side
  const details  = await getProductDetails(params.id);
  console.log(details)
  

  return (
    <div className="p-4 max-w-6xl mx-auto mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-auto max-h-80 object-contain p-3 rounded-lg shadow-xl"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg mb-2">Price: ${product.price}</p>
          <p className="text-lg mb-2">Category: {product.category}</p>
          <p className="mb-4">{product.description}</p>
          <p className="text-md mb-2">In Stock: {product.stock}</p>
          <p className="text-md">
            Ratings: {Array(Math.floor(product.ratings)).fill("★").join("")}
            {product.ratings % 1 !== 0 ? "☆" : ""}
          </p>
          <Link href="/">
            <button className="btn btn-sm bg-gray-200 text-black mt-6 ">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

















// import Image from "next/image";
// import products from "../../../../public/data.json"; // Adjust path if needed
// import Link from "next/link";

// const ProductPage = ({ params }) => {

//   const { id } = params;

//   // Find the product by id
//   // const product = products.find((item) => item.id.toString() === id);
//   const product = products.find((item) => item._id == id);

//   // If product not found, show a message
//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   return (
//     <div className="p-4 max-w-6xl mx-auto mt-24">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Image Section */}
//         <div className="flex justify-center">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={300}
//             height={300}
//             className="w-full h-auto max-h-80 object-contain p-3 rounded-lg shadow-xl"
//           />
//         </div>

//         {/* Details Section */}
//         <div className="flex flex-col justify-center">
//           <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
//           <p className="text-lg mb-2">Price: ${product.price}</p>
//           <p className="text-lg mb-2">Category: {product.category}</p>
//           <p className="mb-4">{product.description}</p>
//           <p className="text-md mb-2">In Stock: {product.stock}</p>
//           <p className="text-md">
//             Ratings: {Array(Math.floor(product.ratings)).fill("★").join("")}
//             {product.ratings % 1 !== 0 ? "☆" : ""}
//           </p>
//           <Link href="/">
//             <button className="btn btn-sm bg-gray-200 text-black mt-6 ">
//               Go Back
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;