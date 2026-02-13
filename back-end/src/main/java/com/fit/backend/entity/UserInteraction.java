package com.fit.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_interactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInteraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId; // Có thể null cho user chưa đăng nhập

    @Column(name = "session_id")
    private String sessionId; // Tracking cho user chưa đăng nhập

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Enumerated(EnumType.STRING)
    @Column(name = "interaction_type")
    private InteractionType interactionType;

    @Column(name = "rating")
    private Double rating; // 1.0 - 5.0

    @Column(name = "search_keyword")
    private String searchKeyword;

    @Column(name = "interaction_time")
    private LocalDateTime interactionTime;

    @Column(name = "weight")
    private Double weight; // Trọng số cho từng loại tương tác

    public enum InteractionType {
        VIEW,           // Xem sản phẩm (weight: 1.0)
        SEARCH,         // Tìm kiếm (weight: 1.5)
        ADD_TO_CART,    // Thêm vào giỏ (weight: 2.0)
        PURCHASE,       // Mua hàng (weight: 5.0)
        RATE,           // Đánh giá (weight: 3.0)
        FAVORITE        // Yêu thích (weight: 2.5)
    }

    @PrePersist
    protected void onCreate() {
        interactionTime = LocalDateTime.now();
        if (weight == null) {
            setWeightByInteractionType();
        }
    }

    private void setWeightByInteractionType() {
        switch (interactionType) {
            case VIEW:
                weight = 1.0;
                break;
            case SEARCH:
                weight = 1.5;
                break;
            case ADD_TO_CART:
                weight = 2.0;
                break;
            case RATE:
                weight = 3.0;
                break;
            case FAVORITE:
                weight = 2.5;
                break;
            case PURCHASE:
                weight = 5.0;
                break;
            default:
                weight = 1.0;
        }
    }
}