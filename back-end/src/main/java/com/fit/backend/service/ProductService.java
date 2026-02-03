package com.fit.backend.service;

import com.fit.backend.dto.ProductDto;
import com.fit.backend.entity.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(ProductDto product);

    List<ProductDto> getAllProduct(Integer categoryId, Integer typeId);

    ProductDto getProductBySlug(String slug);

    ProductDto getProductById(Integer id);

    Product updateProduct(ProductDto productDto);

    void deleteProduct(Integer id);

    Product fetchProductById(Integer id) throws Exception;

//    long getProductCount();
}
