"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductsGrid = ({ products }) => {
  if (!products?.length) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const { name, image, price, _id } = product || {};

        return (
          <div
            key={_id}
            className="flex flex-col justify-between border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full"
          >
            <div className="flex flex-col">
              <Image
                src={image}
                alt={name}
                width={150} // Set a width for image
                height={150} // Set a height for image
                className="w-full h-52 object-cover mb-2 cursor-pointer"
              />
              <h3 className="text-lg font-semibold mt-4">{name}</h3>
              <p className="mb-1">Price: ${price}</p>
            </div>

            <Link href={`/products/${_id}`}>
              <button className="mt-auto bg-blue-600 text-white py-1 px-4 rounded-none">
                View Details
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
