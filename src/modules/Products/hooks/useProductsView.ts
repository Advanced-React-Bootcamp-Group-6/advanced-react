import { useMemo } from "react";
import type { Product } from "../entities/Product";

export const useProductsView = ({
  products,
  page,
  limit,
  search,
  sortBy,
}: {
  products: Product[];
  page: number;
  limit: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc";
}) => {
  const derived = useMemo(() => {
    let result = products;

    // search
    if (search?.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    // sort
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, sortBy]);

  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  const start = (safePage - 1) * safeLimit;
  const end = start + safeLimit;

  return {
    products: derived.slice(start, end),
    total: derived.length,
  };
};
