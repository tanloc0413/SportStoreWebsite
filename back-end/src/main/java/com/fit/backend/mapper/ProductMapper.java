package com.fit.backend.mapper;

import com.fit.backend.dto.ProductDto;
import com.fit.backend.dto.ProductImageDto;
import com.fit.backend.dto.ProductVariantDto;
import com.fit.backend.entity.*;
import com.fit.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    @Autowired
    private CategoryService categoryService;

    public Product mapToProductEntity(ProductDto productDto) {
        Product product = new Product();
        if(null != productDto.getId()) {
            product.setId(productDto.getId());
        }
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setIsNewArrival(productDto.getIsNewArrival());
        product.setPrice(productDto.getPrice());
        product.setRating(productDto.getRating());
        product.setSlug(productDto.getSlug());

        Category category = categoryService.getCategory(productDto.getCategoryId());

        if(null != category) {
            product.setCategory(category);
            Integer categoryTypeId = productDto.getCategoryTypeId();
            CategoryType categoryType = category.getCategoryTypes()
                    .stream()
                    .filter(categoryType1 -> categoryType1
                            .getId()
                            .equals(categoryTypeId))
                    .findFirst()
                    .orElse(null);
            product.setCateType(categoryType);
        }

        if(null != productDto.getVariants()) {
            product.setProductVariants(mapToProductVariant(productDto.getVariants(), product));
        }
        if(null != productDto.getProductImage()) {
            product.setImageList(mapToProductImages(productDto.getProductImage(), product));
        }

        return product;
    }

    private List<ProductVariant> mapToProductVariant(List<ProductVariantDto> productVariantDtos, Product product) {
        return productVariantDtos.stream().map(productVariantDto -> {
            ProductVariant productVariant = new ProductVariant();
            if(null != productVariantDto.getId()) {
                productVariant.setId(productVariantDto.getId());
            }
            productVariant.setColor(productVariantDto.getColor());
            productVariant.setSize(productVariantDto.getSize());
            productVariant.setQuantity(productVariantDto.getQuantity());
            productVariant.setProduct(product);
            return productVariant;
        }).collect(Collectors.toList());
    }

    private List<Image> mapToProductImages(List<ProductImageDto> productImage, Product product) {

        return productImage.stream().map(productImageDto -> {
            Image image = new Image();
            if(null != productImageDto.getId()){
                image.setId(productImageDto.getId());
            }
            image.setName(productImageDto.getName());
            image.setType(productImageDto.getType());
            image.setUrl(productImageDto.getUrl());
            image.setIsPrimary(productImageDto.getIsPrimary());

            return image;
        }).collect(Collectors.toList());
    }

    public List<ProductDto> getProductDtos(List<Product> products) {
        return products.stream().map(this::mapProductToDto).toList();
    }

    public ProductDto mapProductToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .isNewArrival(product.getIsNewArrival())
                .rating(product.getRating())
                .slug(product.getSlug())
                .description(product.getDescription()).build();
    }

    public List<ProductVariantDto> mapProductVariantListToDto(List<ProductVariant> productVariants) {
        return productVariants.stream().map(this::mapProductVariantDto).toList();
    }

    private ProductVariantDto mapProductVariantDto(ProductVariant productVariant) {
        return ProductVariantDto.builder()
                .id(productVariant.getId())
                .color(productVariant.getColor())
                .size(productVariant.getSize())
                .quantity(productVariant.getQuantity())
                .build();
    }

    public List<ProductImageDto> mapProductImageListToDto(List<Image> imageList) {
        return imageList.stream().map(this::mapImageToDto).toList();
    }

    private ProductImageDto mapImageToDto(Image image) {
        return ProductImageDto.builder()
                .id(image.getId())
                .name(image.getName())
                .url(image.getUrl())
                .isPrimary(image.getIsPrimary())
                .type(image.getType())
                .build();
    }
}