import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import { PRODUCTS_QUERY_KEY } from "../queryKeys";

export const useDeleteProduct = ({ onSuccess }: { onSuccess: () => void }) => {
  const { delete: deleteProduct } = useProducts();

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...PRODUCTS_QUERY_KEY],
      });
      onSuccess();
    },
  });

  return {
    deleteProduct: mutate,
    isError,
    isPending,
    isSuccess,
  };
};
