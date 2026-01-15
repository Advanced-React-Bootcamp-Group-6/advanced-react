import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import type { Product } from "../entities/Product";
import { IconEdit, IconTrash } from "@tabler/icons-react";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }} mt={"md"}>
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
        <Group
          pos="absolute"
          top={12}
          left={12}
          gap={6}
          style={{ opacity: 1, transition: "opacity 0.2s ease" }}
        >
          <ActionIcon size="sm" variant="light" color="blue">
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon size="sm" variant="light" color="red">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
        {product.hasDiscounts && (
          <Badge
            color="red"
            variant="filled"
            size="md"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              fontWeight: 700,
            }}
          >
            -{product.discountPercentage}%
          </Badge>
        )}

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
              {product.isAvailable && (
                <Badge color="green" variant="light" size="sm">
                  Available
                </Badge>
              )}
            </Group>
            <Text fw={600} lineClamp={1}>
              {product.name}
            </Text>
            <Text size="sm" c="dimmed" lineClamp={3} mt={8}>
              {product.description}
            </Text>
          </Box>
          <Button
            fullWidth
            radius="md"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Add to Cart
          </Button>
        </Stack>
      </Card>
    </Grid.Col>
  );
}
