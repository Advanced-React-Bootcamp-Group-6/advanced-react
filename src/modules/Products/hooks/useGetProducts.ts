import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import { PRODUCTS_QUERY_KEY } from "../queryKeys";

export const useGetProducts = ({
  categorySlug,
  page,
  limit,
}: {
  categorySlug?: string;
  page: number;
  limit: number;
}) => {
  const { getAll } = useProducts();

  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * limit;

  const { data, isLoading, error } = useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, categorySlug, safePage, limit],
    queryFn: () =>
      getAll({
        categorySlug,
        limit,
        skip,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
  });

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: !!error,
  };
};
