// import React from "react";
// import { getProductDetails } from "@/products/getProducts";

// const Page = async ({ params }) => {
//   const response = await getProductDetails(params.id);

//   const { name, description, category, image, price } = response.product;

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <h2>{name}</h2>
//       <p>{description}</p>
//       <p>Category: {category}</p>
//       <p>Price: ${price}</p>
//     </div>
//   );
// };

// export default Page;

import React from "react";
import { getProductDetails } from "@/products/getProducts";
import CheckoutPage from "@/components/Checkout/CheckoutPage";
// Client component

const Page = async ({ params }) => {
  const response = await getProductDetails(params.id);

  const product = response.product;

  return <CheckoutPage product={product} params={params} />;
};

export default Page;
