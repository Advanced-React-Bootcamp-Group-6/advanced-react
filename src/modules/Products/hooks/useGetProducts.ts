import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";

export const useGetProducts = ({
  categorySlug,
  page,
  limit,
}: {
  categorySlug?: string;
  page: number;
  limit: number;
}) => {
  const { getPaginated } = useProducts();

  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * limit;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", categorySlug, safePage, limit],
    queryFn: () =>
      getPaginated({
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
