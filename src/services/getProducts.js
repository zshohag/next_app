import axios from "axios";

export const getProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return { products: [] }; // Return a consistent structure for the client
  }
};


// export const getServicesDetails = async (id) => {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`
//     );
//     return res.data;
//   } catch (error) {
//     return {};
//   }
// };