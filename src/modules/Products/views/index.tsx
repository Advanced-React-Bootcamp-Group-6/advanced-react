import { Container, Grid, Group, Loader, Text } from "@mantine/core";
import { Pagination } from "@mantine/core";
import ProductItem from "./ProductItem";
import { useProductsFilters } from "../hooks/useProductsFilters";
import { useGetProducts } from "../hooks/useGetProducts";
import { useProductsView } from "../hooks/useProductsView";
import ProductsFilters from "./ProductFilter";

export const Products = () => {
  const filters = useProductsFilters();

  const {
    products: serverProducts,
    isLoading,
    isError,
  } = useGetProducts({
    categorySlug: filters.selectedCategory.slug,
  });

  const { products: visibleProducts, total } = useProductsView({
    products: serverProducts,
    page: filters.currentPage,
    limit: filters.POSTS_PER_PAGE,
    search: filters.searchQuery,
    sortBy: filters.priceSort,
  });

  const totalPages = Math.ceil(total / filters.POSTS_PER_PAGE);

  return (
    <Container size="xl">
      <ProductsFilters
        selectedCategory={filters.selectedCategory}
        onSelectCategory={(c) => {
          filters.setSelectedCategory(c);
          filters.setCurrentPage(1);
        }}
        searchQuery={filters.searchQuery}
        onSearchChange={(v) => {
          filters.setSearchQuery(v);
          filters.setCurrentPage(1);
        }}
        priceSort={filters.priceSort}
        onPriceSortChange={(v) => {
          filters.setPriceSort(v);
          filters.setCurrentPage(1);
        }}
      />
      {isLoading && <Loader />}
      {isError && (
        <Text c="red" fw={600} ta="center" mt="md">
          Failed to fetch products
        </Text>
      )}
      {!isLoading && !isError && (
        <>
          {visibleProducts.length > 0 ? (
            <Grid gutter="md">
              {visibleProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </Grid>
          ) : (
            <Text c="red" fw={600} ta="center" mt="md">
              No products found
            </Text>
          )}

          {totalPages > 1 && (
            <Group justify="center" mt="md">
              <Pagination
                value={filters.currentPage}
                onChange={filters.setCurrentPage}
                total={totalPages}
              />
            </Group>
          )}
        </>
      )}
    </Container>
  );
};
