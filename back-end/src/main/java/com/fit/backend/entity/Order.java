package com.fit.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fit.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // ngày giờ đặt hàng
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    // tổng tiền
    @Column(nullable = false)
    private BigDecimal totalAmount;

    // phương thức thanh toán
    @Column(nullable = false)
    private String paymentMethod;

    // ngày giao hàng dự kiến
    @Temporal(TemporalType.TIMESTAMP)
    private Date expectedDeliveryDate;

    // mã giảm giá
    private Double discount;

    private String shipmentTrackingNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // trạng thái đơn hàng
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "address_id", nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private Address address;

    @OneToOne(
            fetch = FetchType.LAZY,
            mappedBy = "order",
            cascade = CascadeType.ALL
    )
    @ToString.Exclude
    private Payment payment;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "order",
            cascade = CascadeType.ALL
    )
    @ToString.Exclude
    private List<OrderItem> orderItemList;
}
