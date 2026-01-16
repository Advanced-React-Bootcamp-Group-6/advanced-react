import { toProduct } from "../adapters/toProduct";
import type { CategoryDto } from "../dto/Category";
import type { Product } from "../entities/Product";
import type { ProductsApi } from "./productsApi";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsApi => {
  return {
    getAll: async (category?:CategoryDto): Promise<Product[]> => {
      const url=category?.slug ? `${Base_URL}/category/${encodeURIComponent(category.slug)}?Limit=40` : Base_URL;
      console.log("Fetching products from URL:", url);
      const response = await fetch(url);
      if (!response.ok) throw new Error("failed to fetch!");
      const data = await response.json();
      return toProduct(data.products);
    },
    getCategories: async (): Promise<CategoryDto[]> => {
      const response = await fetch(`${Base_URL}/categories`);
      if (!response.ok) throw new Error("failed to fetch categories!");
      const data = await response.json();
      return data as CategoryDto[]
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