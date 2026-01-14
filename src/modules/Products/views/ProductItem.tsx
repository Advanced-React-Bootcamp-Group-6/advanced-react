import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Pill,
  Stack,
  Text,
} from "@mantine/core";
import type { Product } from "../entities/Product";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
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
  );
}
