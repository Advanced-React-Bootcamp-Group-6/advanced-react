import { Table } from "@mantine/core";
import type { Product } from "../../entities/Product";
import { ProductRecord } from "./ProductRecord";

type Props = {
  products: Product[];
};

export function ProductsTable({ products }: Props) {
  const rows = products.map((product) => {
    return (
     <ProductRecord key={product.id} product={product} />
    );
  });

  return (
    <Table.ScrollContainer minWidth={200} type="scrollarea">
      <Table highlightOnHover verticalSpacing="sm" withTableBorder striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Image</Table.Th>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
