import type { ProductDto } from "../dto/Product";
import type { Product } from "../entities/Product";

export const toProduct = (product:ProductDto): Product => {
    return {
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        discountPercentage: product.discountPercentage,
        hasDiscounts: product.discountPercentage > 0,
        discountedPrice: product.discountPercentage > 0 ? parseFloat((product.price * (1 - product.discountPercentage / 100)).toFixed(2)) : undefined,
        rating: product.rating,
        isAvailable: product.stock > 0,
        imageUrl: product.thumbnail,
        tags: product.tags,
        reviews: product.reviews.map(review => ({
            rating: review.rating,
            comment: review.comment,
            reviewer: {
                name: review.reviewerName,
                email: review.reviewerEmail
            }
        }))
    };
}

export const toProducts = (products: ProductDto[]): Product[] => {
    return products.map(toProduct);
}