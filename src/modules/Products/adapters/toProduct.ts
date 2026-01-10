import type { ProductDto } from "../dto/Product";
import type { Product } from "../entities/Product";

export const toProduct = (products: ProductDto[]): Product[] => {
    return products.map(dto => ({
        id: dto.id,
        name: dto.title,
        description: dto.description,
        price: dto.price,
        category: dto.category,
        discountPercentage: dto.discountPercentage,
        rating: dto.rating,
        isAvailable: dto.stock > 0,
        imageUrl: dto.thumbnail,
        tags: dto.tags,
        reviews: dto.reviews.map(review => ({
            rating: review.rating,
            comment: review.comment,
            reviewer: {
                name: review.reviewerName,
                email: review.reviewerEmail
            }
        }))
    }));
}