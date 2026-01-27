import { Grid } from "@mantine/core";
import { ProductsTable } from "./ProductsTable";
import type { Product } from "../../entities/Product";
import ProductItem from "../../components/ProductItem";

type ViewMode = "grid" | "table";

type ProductsViewProps = {
  products: Product[];
  viewMode: ViewMode;
};

export function ProductsView({ products, viewMode }: ProductsViewProps) {
  if (viewMode === "grid") {
    return (
      <Grid gutter="md">
        {products.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </Grid>
    );
  }

  return <ProductsTable products={products} />;
}
