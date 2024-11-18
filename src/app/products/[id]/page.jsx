import Image from "next/image";
import products from "../../../../public/data.json"; // Adjust path if needed

const ProductPage = ({ params }) => {
  const { id } = params;

  // Find the product by id
  // const product = products.find((item) => item.id.toString() === id); 
  const product = products.find((item) => item.id == id);

  // If product not found, show a message
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto py-8 mt-10 ">
      <div className="flex flex-col items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-lg shadow"
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="text-lg font-semibold mt-4">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductPage;


// import Image from "next/image";
// import products from "../../../../public/data.json"; // Adjust path if needed

// export const metadata = ({ params }) => {
//   const { id } = params;
//   const product = products.find((item) => item.id == id);

//   if (!product) {
//     return {
//       title: "Product Not Found - Next App",
//       description: "The product you are looking for does not exist.",
//     };
//   }

//   return {
//     title: `${product.name} | Next App`,
//     description: `Discover ${product.name}: ${product.description}. Only $${product.price}!`,
//     keywords: `${product.name}, buy ${product.name}, ${product.category}, products`,
//   };
// };

// const ProductPage = ({ params }) => {
//   const { id } = params;
//   const product = products.find((item) => item.id == id);

//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   return (
//     <div className="container mx-auto py-8 mt-10 ">
//       <div className="flex flex-col items-center">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={300}
//           height={300}
//           className="rounded-lg shadow"
//         />
//         <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
//         <p className="mt-2 text-gray-600">{product.description}</p>
//         <p className="text-lg font-semibold mt-4">${product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
