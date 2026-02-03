package com.fit.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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

    private Boolean isNewArrival;

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

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Image> imageList;
}