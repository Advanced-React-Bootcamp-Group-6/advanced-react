import type { CategoryDto } from "../dto/Category";
import type { Product } from "../entities/Product";

export interface ProductsApi {
  getPaginated: (params: {
    categorySlug?: string;
    limit: number;
    skip: number;
  }) => Promise<{
    products: Product[];
    total: number;
  }>;

  getCategories: () => Promise<CategoryDto[]>;

  delete: (id: string) => Promise<void>;
}
