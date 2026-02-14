package com.fit.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRecommendationDto {

    private Integer productId;
    private String productName;
    private Double price;
    private String imageUrl;
    private String slug;
    private Double recommendationScore;
    private String reason; // Lý do gợi ý

    // Constructor cho mapping từ Product entity
    public ProductRecommendationDto(Integer productId, String productName, Double price,
                                    String imageUrl, String slug, Double score) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.slug = slug;
        this.recommendationScore = score;
    }
}