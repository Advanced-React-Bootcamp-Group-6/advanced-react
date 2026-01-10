export type ProductDto = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  tags: string[];
  reviews: ReviewDto[];
};

export type ReviewDto = {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
};
