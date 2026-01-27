import { ActionIcon, Badge, Group, Image, Table, Text } from "@mantine/core";
import type { Product } from "../../entities/Product";
import { Link } from "@tanstack/react-router";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";

export const ProductRecord = ({ product }: { product: Product }) => {
  const { deleteProduct, isSuccess } = useDeleteProduct({
    onSuccess: () => {},
  });

  if (isSuccess) return null;
  return (
    <Table.Tr key={product.id} h={120}>
      <Table.Td align="left">
        <Image src={product.imageUrl} w={150} />
      </Table.Td>

      <Table.Td align="left">
        <Text fw={600}>{product.name}</Text>
      </Table.Td>

      <Table.Td align="left">
        <Badge variant="light">{product.category}</Badge>
      </Table.Td>

      <Table.Td align="left">
        <Text fw={600}>${product.discountedPrice?.toFixed(2)}</Text>
      </Table.Td>

      <Table.Td align="left">
        <Badge color="green">In Stock</Badge>
      </Table.Td>

      <Table.Td align="left">
        <Group gap={3}>
          <ActionIcon
            component={Link}
            to="/product/$productId"
            params={{ productId: product.id }}
            variant="subtle"
            color="yellow"
          >
            <IconEye size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle">
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={18} onClick={() => deleteProduct(product.id)} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
