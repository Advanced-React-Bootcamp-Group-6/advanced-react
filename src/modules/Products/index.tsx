import { createContext, useContext, type PropsWithChildren } from "react";
import { restProducts } from "./api/restProducts";
import type { ProductsApi } from "./api/prodcutsApi";

const ProductsContext = createContext<ProductsApi | null>(null);
type ProductsProviderProps = PropsWithChildren<{
  value: ProductsApi;
}>;
export const ProductsProvider = ({
  value,
  children,
}: ProductsProviderProps) => (
  <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === null) {
    throw new Error("useProducts must be used with a ProductsProvider");
  }
  return context;
};

export function ProductsModule() {
  const value = restProducts();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <ProductsProvider value={value}>{children}</ProductsProvider>
    ),
  };
}
