package com.fit.backend.controller;

import com.fit.backend.dto.ProductDto;
import com.fit.backend.entity.Product;
import com.fit.backend.service.ProductService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @RequestParam(required = false, name = "categoryId", value = "categoryId") Integer categoryId,
            @RequestParam(required = false, name = "typeId", value = "typeId") Integer typeId,
            @RequestParam(required = false) String slug,
            @RequestParam(required = false) String keyword,
            HttpServletResponse response
    ) {
        List<ProductDto> productList = new ArrayList<>();

        if(StringUtils.isNotBlank(slug)) {
            ProductDto productDto = productService.getProductBySlug(slug);
            productList.add(productDto);
        } else {
            productList = productService.getAllProduct(categoryId, typeId, keyword);
        }

        response.setHeader("Content-Range",String.valueOf(productList.size()));
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Integer id) {
        ProductDto productDto = productService.getProductById(id);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<ProductDto> getProductBySlug(@PathVariable String slug) {
        ProductDto productDto = productService.getProductBySlug(slug);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        Product product = productService.addProduct(productDto);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody ProductDto productDto) {
        Product product = productService.updateProduct(productDto);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

//    @GetMapping("/count")
//    public ResponseEntity<Long> getProductCount() {
//        long count = productService.getProductCount();
//        return new ResponseEntity<>(count, HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @GetMapping("/search")
//    public ResponseEntity<List<ProductDto>> searchProducts(
//            @RequestParam String keyword) {
//
//        return ResponseEntity.ok(
//                productService.searchProducts(keyword)
//        );
//    }
}
