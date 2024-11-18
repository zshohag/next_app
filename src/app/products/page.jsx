"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import products from "../../../public/data.json";

const ProductHomePage = () => {
  return (
    <div className="px-5 py-16 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-10 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full"
          >
            <div className="flex flex-col items-center ">
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
            <div className="flex justify-center w-2/3 mx-auto mt-4">
              <Link  href={`/products/${product.id}`}>
                <button className=" btn btn-sm bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
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
