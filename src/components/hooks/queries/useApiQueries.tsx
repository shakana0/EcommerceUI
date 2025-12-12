import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../api/useApi";

export function useApiQueries() {
  const { get, getById, post, put, del } = useApi();
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => get(),
  });

  const productQuery = (id: string) =>
    useQuery({
      queryKey: ["product", id],
      queryFn: () => getById(`Products/${id}`),
      enabled: !!id,
    });

  const createProduct = useMutation({
    mutationFn: (newProduct: any) => post("Products", "", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: (product: any) => put(`Products/${product.id}`, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => del(`Products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    productsQuery,
    productQuery,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
