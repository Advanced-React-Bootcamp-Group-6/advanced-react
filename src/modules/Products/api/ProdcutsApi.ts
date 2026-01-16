import type { CategoryDto } from "../dto/Category";
import type { Product } from "../entities/Product";

export interface ProductsApi {
  getAll: (category?:CategoryDto) => Promise<Product[]>;
  getCategories: () => Promise<CategoryDto[]>;
  delete: (id: string) => Promise<void>;
}
