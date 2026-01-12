import { useState } from "react";
import { Group, Grid, Title, Stack } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { Pagination } from "@mantine/core";
import type { Product } from "../entities/Product";
import ProductItem from "./ProductItem";

export const Products = () => {
  const { allProducts, isEmpty } = useGetAllProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 8;

  const lastPostIndex = currentPage * POSTS_PER_PAGE;
  const firstPostIndex = lastPostIndex - POSTS_PER_PAGE;
  const currentPosts = allProducts.slice(firstPostIndex, lastPostIndex);

  if (isEmpty) {
    return <Title> No products available </Title>;
  }

  return (
    <Stack gap="lg">
      <Title order={2}>All Products</Title>

      <Grid gutter="lg">
        {currentPosts.map((product: Product) => (
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
    </Stack>
  );
};
