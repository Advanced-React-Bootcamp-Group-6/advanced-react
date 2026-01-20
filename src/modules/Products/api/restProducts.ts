import { toProduct } from "../adapters/toProduct";
import type { CategoryDto } from "../dto/Category";
import type { ProductsApi } from "./ProdcutsApi";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsApi => {
  return {
    getAll: async ({
      categorySlug,
      limit,
      skip,
    }: {
      categorySlug?: string;
      limit: number;
      skip: number;
    }) => {
      const base = categorySlug
        ? `${Base_URL}/category/${encodeURIComponent(categorySlug)}`
        : Base_URL;

      const url = `${base}?limit=${limit}&skip=${skip}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("failed to fetch");

      const data = await response.json();

      return {
        products: toProduct(data.products),
        total: data.total,
      };
    },

    // /////////////////
    getCategories: async (): Promise<CategoryDto[]> => {
      const response = await fetch(`${Base_URL}/categories`);
      if (!response.ok) throw new Error("failed to fetch categories!");
      const data = await response.json();
      return data as CategoryDto[];
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${Base_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return;
    },
  };
};
