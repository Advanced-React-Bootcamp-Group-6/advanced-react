import { useState } from "react";
import type { CategoryDto } from "../dto/Category";
import type { ViewMode } from "../new-ui/components/ViewToggle";

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

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return {
    selectedCategory,
    searchQuery,
    priceSort,
    currentPage,
    POSTS_PER_PAGE,
    viewMode,
    setViewMode,
    setSelectedCategory,
    setSearchQuery,
    setPriceSort,
    setCurrentPage,
  };
};
