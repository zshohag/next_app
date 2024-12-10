import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {

    const {name, image, price, _id} = product || {};


  return (
    <div className="flex flex-col justify-between border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full">
      <div className="flex flex-col items-center">
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="rounded"
        />
        <h3 className="text-lg font-semibold mt-4 text-center">
          {name}
        </h3>
        <p className="font-bold text-xl text-center text-blue-500">
          ${price}
        </p>
      </div>
      <div className="flex justify-center mx-auto w-3/4 mt-4">
        <Link href={`/products/${_id}`}>
          <button className="btn btn-sm bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-200">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
