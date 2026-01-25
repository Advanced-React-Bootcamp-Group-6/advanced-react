import type { CategoryDto } from "../dto/Category";
import type { Product } from "../entities/Product";

export interface ProductsApi {
  getAll: (params: { categorySlug?: string }) => Promise<Product[]>;

  getById: (id: string) => Promise<Product>;

  getCategories: () => Promise<CategoryDto[]>;

  delete: (id: string) => Promise<void>;
}
