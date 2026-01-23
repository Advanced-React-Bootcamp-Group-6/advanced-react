import { Group, Grid, Container, Loader, Text, Button } from "@mantine/core";
import { Pagination } from "@mantine/core";
import type { Product } from "../entities/Product";
import ProductItem from "./ProductItem";
import ProductCategoryFilter from "./ProductFilter";
import { useGetProducts } from "../hooks/useGetProducts";
import { Link } from "@tanstack/react-router";
import { useProductsFilters } from "../hooks/useProductsFilters";

export const Products = () => {
  const {
    selectedCategory,
    currentPage,
    POSTS_PER_PAGE,
    setCurrentPage,
    handleCategoryChange,
  } = useProductsFilters();

  const { products, total, isLoading, isError } = useGetProducts({
    categorySlug: selectedCategory.slug,
    page: currentPage,
    limit: POSTS_PER_PAGE,
  });

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  if (isLoading)
    return (
      <Container ta="center" mt="xl">
        <Loader size="lg" />
      </Container>
    );

  if (isError)
    return (
      <Container ta="center" mt="xl">
        <Text c="red" fw={600}>
          Product not found
        </Text>
        <Button mt="md" component={Link} to="/">
          Back to products
        </Button>
      </Container>
    );
  return (
    <Container size={"xl"}>
      <ProductCategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
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
