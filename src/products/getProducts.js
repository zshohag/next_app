import axios from "axios";

export const getProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/api/get-all`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] }; // Return a consistent structure for the client
  }
};

export const getProductDetails = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/api/${id}`
    );

    // Extract the inner 'product' key here
    const product = res.data.product;

    return { success: true, product }; // Return the unwrapped product
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, product: null, error: "Failed to fetch product" };
  }
};

// export const getProductDetails = async (id) => {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/products/api/${id}`
//     );
//     return { success: true, product: res.data };
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return { success: false, product: null, error: "Failed to fetch product" };
//   }
// };
