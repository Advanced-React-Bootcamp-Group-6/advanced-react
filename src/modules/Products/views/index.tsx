import { useState } from "react";
import {
  Group,
  Grid,
  Title,
  Container,
  Loader,
  AppShell,
} from "@mantine/core";
import { Pagination } from "@mantine/core";

import type { Product } from "../entities/Product";
import type { CategoryDto } from "../dto/Category";

import ProductItem from "./ProductItem";
import ProductLayout from "./ProductLayout";
import ProductCategoryFilter from "./ProductFilter";
import { useGetProducts } from "../hooks/useGetProducts";

export const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>({
    name: "All",
    slug: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState<"all" | "high" | "low">("all");

  const POSTS_PER_PAGE = 8;

  const {
    products = [],
    total = 0,
    isLoading,
    isError,
  } = useGetProducts({
    categorySlug: selectedCategory.slug,
    page: currentPage,
    limit: POSTS_PER_PAGE,
  });

  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (priceFilter === "high") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (priceFilter === "low") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  if (isError) return <Title>No products available</Title>;
  if (isLoading) return <Loader />;

  return (
    <AppShell header={{ height: 75 }} padding={0}>
      <ProductLayout />
      <AppShell.Main pt="xl">
        <Container size="xl">
          <ProductCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
          />

          <Grid gutter="lg">
            {filteredProducts.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
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
      </AppShell.Main>
    </AppShell>
  );
};
