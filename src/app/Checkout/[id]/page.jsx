import React from "react";
import { getProductDetails } from "@/products/getProducts";
import CheckoutPage from "@/components/Checkout/CheckoutPage";
// Client component

const Page = async ({ params }) => {
  const { id } = await params;

  const response = await getProductDetails(id);

  const product = response.product;

  return <CheckoutPage product={product} params={params} />;
};

export default Page;
