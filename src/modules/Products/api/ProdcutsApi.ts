import type { CategoryDto } from "../dto/Category";
import type { Product } from "../entities/Product";

export interface ProductsApi {
  getAll: (params: {
    categorySlug?: string;
    limit: number;
    skip: number;
  }) => Promise<{
    products: Product[];
    total: number;
  }>;

  getById: (id: string) => Promise<Product>;
  
  getCategories: () => Promise<CategoryDto[]>;

  delete: (id: string) => Promise<void>;
}
