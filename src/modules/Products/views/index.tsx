import { useState } from "react";
import { Group, Grid, Title, Container, Loader, AppShell } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { Pagination } from "@mantine/core";
import type { Product } from "../entities/Product";
import ProductItem from "./ProductItem";
import type { CategoryDto } from "../dto/Category";
import ProductLayout from "./ProductLayout";
import ProductCategoryFilter from "./ProductFilter";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>({
    name: "All",
    slug: undefined,
  });
  const { allProducts, isEmpty, isLoading } = useGetAllProducts(
    selectedCategory.slug === undefined ? undefined : selectedCategory
  );
  const POSTS_PER_PAGE = 8;
  console.log("Selected Category:", selectedCategory);
  console.log("All Products:", allProducts);

  const lastPostIndex = currentPage * POSTS_PER_PAGE;
  const firstPostIndex = lastPostIndex - POSTS_PER_PAGE;
  const currentProducts = allProducts.slice(firstPostIndex, lastPostIndex);
  if (isEmpty) return <Title> No products available </Title>;

  if (isLoading) return <Loader />;
  return (
    <AppShell header={{ height: 75 }} padding={0}>
      <ProductLayout />
      <AppShell.Main pt={"xl"}>
        <Container  size={"xl"}>
          <ProductCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <Grid gutter="lg">
            {currentProducts.map((product: Product) => (
              <ProductItem product={product} />
            ))}
          </Grid>

          <Group justify="center" mt="md">
            <Pagination
              total={Math.ceil(allProducts.length / 8)}
              value={currentPage}
              onChange={setCurrentPage}
            />
          </Group>
        </Container>
      </AppShell.Main >
    </AppShell>
  );
};
