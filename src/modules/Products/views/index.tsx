import { useState } from "react";
import { Group, Grid, Title, Container, Loader } from "@mantine/core";
import { Pagination } from "@mantine/core";
import type { Product } from "../entities/Product";
import ProductItem from "./ProductItem";
import type { CategoryDto } from "../dto/Category";
import ProductCategoryFilter from "./ProductFilter";
import { useGetProducts } from "../hooks/useGetProducts";

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>({
    name: "All",
    slug: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 8;

  const { products, total, isLoading, isError } = useGetProducts({
    categorySlug: selectedCategory.slug,
    page: currentPage,
    limit: POSTS_PER_PAGE,
  });

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  if (isError) return <Title> No products available </Title>;

  if (isLoading) return <Loader />;
  return (
    <Container size={"xl"}>
      <ProductCategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Grid gutter="md">
        {products.map((product: Product) => (
          <ProductItem product={product} />
        ))}
      </Grid>

      <Group justify="center" mt="md">
        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </Group>
    </Container>
  );
};
