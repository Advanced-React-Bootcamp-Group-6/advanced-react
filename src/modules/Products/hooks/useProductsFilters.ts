import { useState } from "react";
import type { CategoryDto } from "../dto/Category";

export const useProductsFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>({
    name: "All",
    slug: undefined,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 8;

  const handleCategoryChange = (category: CategoryDto) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return {
    selectedCategory,
    currentPage,
    POSTS_PER_PAGE,
    setCurrentPage,
    handleCategoryChange,
  };
};
