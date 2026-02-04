import { toProduct, toProducts } from "../adapters/toProduct";
import type { CategoryDto } from "../dto/Category";
import type { Product } from "../entities/Product";
import type { ProductsApi } from "./ProdcutsApi";

const BASE_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsApi => {
  return {
    getAll: async ({ categorySlug }) => {
      const url = categorySlug
        ? `${BASE_URL}/category/${encodeURIComponent(categorySlug)}`
        : BASE_URL;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return toProducts(data.products);
    },

    getById: async (id: string): Promise<Product> => {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) throw new Error("failed to fetch product!");
      const data = await response.json();
      return toProduct(data);
    },

    getCategories: async (): Promise<CategoryDto[]> => {
      const response = await fetch(`${BASE_URL}/categories`);
      if (!response.ok) throw new Error("failed to fetch categories!");
      const data = await response.json();
      return data as CategoryDto[];
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return;
    },
  };
};
