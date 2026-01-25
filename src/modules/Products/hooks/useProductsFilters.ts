import { useState } from "react";
import type { CategoryDto } from "../dto/Category";

export const useProductsFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>({
    name: "All",
    slug: undefined,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [priceSort, setPriceSort] = useState<
    "price-asc" | "price-desc" | undefined
  >();

  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 8;

  return {
    selectedCategory,
    searchQuery,
    priceSort,
    currentPage,
    POSTS_PER_PAGE,

    setSelectedCategory,
    setSearchQuery,
    setPriceSort,
    setCurrentPage,
  };
};
