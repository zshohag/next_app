import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data: products = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // Add a new product
  const addProduct = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axiosSecure.post("/products", newProduct);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["products"]);
    },
  });

  // Update a product
  const updateProduct = useMutation({
    mutationFn: async (product) => {
      const res = await axiosSecure.patch(`/products/${product._id}`, product);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["products"]);
    },
  });

  return { products, loading, refetch, addProduct, updateProduct };
};

export default useProducts;
