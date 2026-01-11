export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
  rating: number;
  isAvailable: boolean;
  imageUrl: string;
  hasDiscounts: boolean;
  tags: string[];
  reviews: Review[];
};

export type Review = {
  rating: number;
  comment: string;
  reviewer: {
    name: string;
    email: string;
  };
};
