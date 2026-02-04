import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";

export const useCategories = () => {
    const { getCategories } = useProducts();
    const {
      data: categories = [],
      error,
      isLoading,
    } = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
      staleTime: 1000 * 60,
    });
    return {
      categories,
      isEmpty: error,
      isLoading,
    };
}