import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";

export  const useGetProductById = (id: string) => {
    const {getById} = useProducts();
    const {data, isLoading, isError} = useQuery({
        queryKey: ["product", id],
        queryFn: () => getById(id),
        enabled: !!id,
        staleTime: 1000 * 60,
    });
    return {
        product: data,
        isLoading,
        isError,
    };
};