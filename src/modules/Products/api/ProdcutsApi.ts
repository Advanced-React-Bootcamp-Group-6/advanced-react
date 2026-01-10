import type { Product } from "../entities/Product";

export interface ProductsApi {
  getAll: () => Promise<Product[]>;
}
