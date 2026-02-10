package com.fit.backend.dto;

import com.fit.backend.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDetail {
    private Integer id;
    private Product product;
    private Integer productVariantId;
    private Integer quantity;
    private Double itemPrice;
}
