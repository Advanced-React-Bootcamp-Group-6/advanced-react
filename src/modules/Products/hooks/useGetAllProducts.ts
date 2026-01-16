import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { CategoryDto } from "../dto/Category";


const Get_ALL_PRODUCTS_QUERY_KEY = "products";

export const useGetAllProducts = (category?: CategoryDto) => {
  const { getAll } = useProducts();
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: [Get_ALL_PRODUCTS_QUERY_KEY,category?.slug],
    queryFn: ()=>getAll(category),
    staleTime: 1000 * 60,
    
  });

  return {
    allProducts: data,
    isEmpty: error,
    isLoading,
  };
};

useGetAllProducts.queryKey = Get_ALL_PRODUCTS_QUERY_KEY;
