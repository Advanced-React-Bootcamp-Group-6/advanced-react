import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Pill,
} from "@mantine/core";
import { toProduct } from "../adapters/toProduct";
import type { Product } from "../entities/Product";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const entities = toProduct(data.products);
        setProducts(entities);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <Grid>
      {products.map((product) => (
        <Grid.Col key={product.id} span={{ base: 12,sm: 6,  md: 4, lg: 2 }}>
          <Card
            shadow="sm"
            radius="md"
            withBorder
            style={{
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Section style={{ flexShrink: 0 }}>
              <Image
                src={product.imageUrl}
                height={180}
                alt={product.name}
                fit="cover"
              />
            </Card.Section>

            {product.isAvailable && <Pill>Available</Pill>}

            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Group justify="space-between" mt="sm">
                  <Text fw={600} lineClamp={1}>
                    {product.name}
                  </Text>
                  <Badge color="pink" variant="light">
                    On Sale
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" lineClamp={3} mt={4}>
                  {product.description}
                </Text>
              </div>

              <Button fullWidth mt="md" radius="md" variant="light">
                Order Now
              </Button>
            </div>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
