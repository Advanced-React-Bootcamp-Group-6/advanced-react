import { Link, useParams } from "@tanstack/react-router";
import { useGetProductById } from "../hooks/useGetProductById";
import {
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconShoppingCart } from "@tabler/icons-react";

export const ProductDetail = () => {
  const { productId } = useParams({ strict: false });
  const { product, isLoading, isError } = useGetProductById(productId!);

  if (isLoading) return <Loader />;

  if (isError || !product) return <Title>Product not found</Title>;
  return (
    <Container size="xl" py="xl">
      <Paper radius="lg" p="xl" withBorder>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Image
              src={product.imageUrl}
              radius="md"
              alt={product.name}
              height={300}
              width="100%"
              fit="contain"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="sm">
              <Button
                w={"180"}
                variant="light"
                leftSection={<IconArrowLeft size={16} />}
                component={Link}
                to="/"
                mb="md"
              >
                Back to products
              </Button>

              <Group justify="space-between">
                <Title order={2}>{product.name}</Title>
                <Badge color="green">{product.category}</Badge>
              </Group>

              <Text size="md" pl="0" c="dimmed" style={{ textAlign: "left" }}>
                {product.description}
              </Text>

              <Rating value={product.rating} readOnly />

              <Group mt="xs" wrap="wrap">
                {product.tags.map((tag) => (
                  <Badge key={tag} color="gray" variant="outline">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Divider my="sm" />

              <Group align="center">
                <Text fw={700} fz="lg" c="black">
                  ${product?.discountedPrice}
                </Text>
                <Text
                  fz="sm"
                  c="dimmed"
                  style={{ textDecoration: "line-through" }}
                >
                  ${product.price.toFixed(2)}
                </Text>
                <Badge color="red"  >{product.discountPercentage}% OFF</Badge>
              </Group>

              <Group mt="md">
                <Button size="md" leftSection={<IconShoppingCart size={18} />}>
                  Add to Cart
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};
