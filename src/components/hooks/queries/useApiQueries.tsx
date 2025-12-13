import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../api/useApi";

export function useApiQueries() {
  const { getProducts, getAllProducts, getById, post, put, del } = useApi();
  const queryClient = useQueryClient();

  const productsQuery = (page: number, pageSize: number) =>
    useQuery({
      queryKey: ["products", page, pageSize],
      queryFn: () => getProducts(page, pageSize),
    });

  const allProductsQuery = () =>
    useQuery({
      queryKey: ["products"],
      queryFn: () => getAllProducts(),
    });

  const productQuery = (id: string) =>
    useQuery({
      queryKey: ["product", id],
      queryFn: () => getById(`Products/${id}`),
      enabled: !!id,
    });

  const createProduct = useMutation({
    mutationFn: (newProduct: any) => post("Products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });

  const updateProduct = useMutation({
    mutationFn: (product: any) => put(`Products/${product.id}`, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => del(`Products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });

  return {
    productsQuery,
    allProductsQuery,
    productQuery,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
