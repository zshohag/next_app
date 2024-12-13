import React from "react";
import { getProducts } from "@/products/getProducts";
import ProductsLayout from "../ProductsCase/ProductsLayout";

const Products = async () => {
  const { products } = await getProducts();

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="px-5">
      <ProductsLayout products={products} />
    </div>
  );
};

export default Products;





