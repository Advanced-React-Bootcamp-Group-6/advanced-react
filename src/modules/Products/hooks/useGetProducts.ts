import { useQuery } from "@tanstack/react-query";
import type { Product } from "../entities/Product";
import { useProducts } from "..";

const PRODUCTS_QUERY_KEY = ["products"];

export const useGetProducts = ({ categorySlug }: { categorySlug?: string }) => {
  const { getAll } = useProducts();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: [...PRODUCTS_QUERY_KEY, categorySlug],
    queryFn: () => getAll({ categorySlug }),
    staleTime: 1000 * 60,
  });

  return {
    products: data,
    isLoading,
    isError: !!error,
  };
};
