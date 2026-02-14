package com.fit.backend.specification;

import com.fit.backend.entity.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {
    public static Specification<Product> hasCategoryId(Integer categoryId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<Product> hasCategoryTypeId(Integer typeId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("cateType").get("id"), typeId);
    }
    
    // tìm kiếm sp
    public static Specification<Product> hasNameLike(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder
                .like(criteriaBuilder.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
    }
}