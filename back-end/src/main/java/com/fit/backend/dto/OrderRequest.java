package com.fit.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private Integer userId;
    private Date orderDate;
    private Integer addressId;
    private List<OrderItemRequest> orderItemRequests;
    private BigDecimal totalAmount;
    private Double discount;
    private String paymentMethod;
    private Date expectedDeliveryDate;
}