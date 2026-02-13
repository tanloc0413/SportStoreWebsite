package com.fit.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 500)
    private String name;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    private BigDecimal price;

    private boolean isNewArrival;

    private Float rating;

    @Column(unique = true, columnDefinition = "LONGTEXT", nullable = false)
    private String slug;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductVariant> productVariants;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryType_id")
    @JsonIgnore
    private CategoryType cateType;

    // danh sách hình ảnh sản phẩm
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @ToString.Exclude // THÊM DÒNG NÀY
    @EqualsAndHashCode.Exclude // THÊM DÒNG NÀY
    private List<Image> imageList;

    @ManyToOne
    private Brand brand;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}