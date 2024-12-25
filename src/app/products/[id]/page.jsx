import Image from "next/image";
import Link from "next/link";
import { getProductDetails } from "@/products/getProducts";

export const metadata = {
  title: "Product Details",
  description: "Product Details Page",
};


const ProductDetailsPage = async ({ params }) => {
  try {
    //console.log("Product ID:", params.id);
    // Fetch product details using the product ID
    //const response = await getProductDetails(params.id);
    //console.log("response", response);


     // Ensure `params` is properly awaited before use
     const { id } = await params;

     // Fetch product details using the product ID
     const response = await getProductDetails(id);








    if (!response.success) {
      // Handle error if product fetching fails
      return (
        <div className="p-4 max-w-6xl mx-auto mt-24">
          <h1 className="text-2xl font-bold text-center text-red-600">
            {response.error || "Product not found"}
          </h1>
          <Link href="/">
            <button className="btn btn-sm bg-gray-200 text-black mt-6 mx-auto block">
              Go Back
            </button>
          </Link>
        </div>
      );
    }

    // Extract product data
    const product = response.product;
    //console.log(product);

    const { _id, name, description, category, image, price, stock, ratings } =
      product;

    return (
      <div className="p-4 max-w-6xl mx-auto mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="w-full h-auto max-h-80 object-contain p-3 rounded-lg shadow-xl"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">{name}</h2>

            <p className="text-lg mb-2">Category: {category}</p>
            <p className="mb-4">{description}</p>
            <p className="text-md mb-2">In Stock: {stock}</p>
            <p className="text-md">
              Ratings:{" "}
              {Array.from({ length: Math.floor(ratings) }, () => "★").join("")}
              {ratings % 1 !== 0 && "☆"}
            </p>
            <p className="text-lg mb-2">Price: ${price}</p>
            <div className="flex justify-start gap-3">
              <div>
                <Link href="/">
                  <button className="btn btn-sm bg-gray-200 text-black mt-6">
                    Go Back
                  </button>
                </Link>
              </div>
              <div>
                <Link href={`/checkout/${_id}`}>
                  <button className="btn btn-sm bg-gray-200 text-black mt-6">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in ProductDetailsPage:", error);
    return (
      <div className="p-4 max-w-6xl mx-auto mt-24">
        <h1 className="text-2xl font-bold text-center text-red-600">
          An unexpected error occurred.
        </h1>
        <Link href="/">
          <button className="btn btn-sm bg-gray-200 text-black mt-6 mx-auto block">
            Go Back
          </button>
        </Link>
      </div>
    );
  }
};

export default ProductDetailsPage;
