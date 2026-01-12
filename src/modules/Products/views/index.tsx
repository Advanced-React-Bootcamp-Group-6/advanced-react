import { useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Pill,
  Title,
  Stack,
  Box,
} from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { Pagination } from "@mantine/core";

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
        {currentPosts.map((product: any) => (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, lg: 3 }}>
            <Card
              ta="left"
              withBorder
              radius="md"
              shadow="sm"
              padding="md"
              h={400}
              display="flex"
              style={{ flexDirection: "column" }}
            >
              <Card.Section>
                <Image
                  src={product.imageUrl}
                  height={180}
                  alt={product.name}
                  fit="contain"
                />
              </Card.Section>
              <Stack justify="space-between" h="100%" mt="sm">
                <Box>
                  <Group gap="xs" mt={6}>
                    {product.isAvailable && <Pill size="sm">Available</Pill>}
                    <Badge color="pink" variant="light">
                      On Sale
                    </Badge>
                  </Group>
                  <Text fw={600} lineClamp={1}>
                    {product.name}
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={3} mt={8}>
                    {product.description}
                  </Text>
                </Box>
                <Button fullWidth radius="md" variant="light" mt="md">
                  Order Now
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
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
