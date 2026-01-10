import { toProduct } from "../adapters/toProduct";
import type { Product } from "../entities/Product";
import type { ProductsApi } from "./prodcutsApi";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsApi => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(Base_URL);
      if (!response.ok) throw new Error("failed to fetch!");
      const data = await response.json();
      return toProduct(data.products);
    },
  };
};
