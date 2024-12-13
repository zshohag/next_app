import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {

    const {name, image, price, _id} = product || {};

  return (
    <div className="relative flex flex-col justify-between border border-gray-300  shadow-lg hover:shadow-2xl transition-shadow p-4 bg-white h-full">
      <div className="flex flex-col">
      <Image
        src={image}
        alt={name}
        width={150} // Set a width for image
        height={150} // Set a height for image
        className="w-full h-52 object-cover mb-2 cursor-pointer"
      />
        <h3 className="text-lg font-semibold mt-4">
          {name}
        </h3>
        <p className="mb-1">
        Price: ${price}
        </p>
      </div>
      <div className="flex justify-start  w-3/4 mt-4">
        <Link href={`/products/${_id}`}>
          <button className="mt-auto bg-blue-600  text-white py-1 px-4 rounded-none">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;



// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const ProductCard = ({ product, renderStars }) => {
//   const { name, image, price, ratings, _id } = product || {};

//   return (
//     <div className="border border-gray-300 p-4 relative flex flex-col justify-between h-full">
//       {/* Product image and modal interaction */}
      // <Image
      //   src={image}
      //   alt={name}
      //   width={150} // Set a width for image
      //   height={150} // Set a height for image
      //   className="w-full h-52 object-cover mb-2 cursor-pointer"
      // />

//       {/* Product name */}
//       <h3 className="text-lg font-semibold mb-2">{name}</h3>

//       {/* Product price */}
//       <p className="mb-1">Price: ${price}</p>

//       {/* Product ratings displayed above "Order Now" button */}
//       <p className="mb-2">Ratings: {renderStars(ratings)}</p>

//       {/* "Order Now" button wrapped by Link */}
//       {/* <Link
//         className="mt-auto bg-blue-600 text-white py-1 px-4 rounded-none"
//         href={`/products/${_id}`}
//       >
//         Order Now
//       </Link> */}

//       <Link href={`/products/${_id}`}>
//         <button className="btn btn-sm bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-200">
//           View Details
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;
