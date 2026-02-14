package com.fit.backend.service;

import com.fit.backend.dto.ProductDto;
import com.fit.backend.dto.ProductImageDto;
import com.fit.backend.entity.*;
import com.fit.backend.exception.ResourceNotFoundEx;
import com.fit.backend.mapper.ProductMapper;
import com.fit.backend.repository.ImageRepository;
import com.fit.backend.repository.ProductRepository;
import com.fit.backend.specification.ProductSpecification;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ImageRepository imageRepository;

    @Override
    @Transactional
    public Product addProduct(ProductDto productDto) {
        Product product = productMapper.mapToProductEntity(productDto);

        return productRepository.save(product);
    }

    @Override
    public List<ProductDto> getAllProduct(
            Integer categoryId,
            Integer typeId,
            String keyword) {
        Specification<Product> productSpecification =
                (root, query, cb) -> cb.conjunction();

        // Bây giờ bạn có thể .and thoải mái vì productSpecification không bao giờ null
        if (categoryId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }

        if (typeId != null) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
        }

        // tìm kiếm sp
        if (keyword != null && !keyword.trim().isEmpty()) {
            productSpecification = productSpecification.and(ProductSpecification.hasNameLike(keyword.trim()));
        }

        // Thực hiện truy vấn
        List<Product> products = productRepository.findAll(productSpecification);

//        return productMapper.getProductDtos(products);

        // Map sản phẩm và thêm thông tin chi tiết
        return products.stream().map(product -> {
            ProductDto productDto = productMapper.mapProductToDto(product);

            // Thêm thông tin category
            if (product.getCategory() != null) {
                productDto.setCategoryId(product.getCategory().getId());
                productDto.setCategoryName(product.getCategory().getName());
            }

            if (product.getCateType() != null) {
                productDto.setCategoryTypeId(product.getCateType().getId());
                productDto.setCategoryTypeName(product.getCateType().getName());
            }

            // Thêm thông tin hình ảnh và variants
            if (product.getProductVariants() != null) {
                productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariants()));
            }

            if (product.getImageList() != null) {
                productDto.setProductImage(productMapper.mapProductImageListToDto(product.getImageList()));
            }

            return productDto;
        }).collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductBySlug(String slug) {
        Product product = productRepository.findFirstBySlug(slug);

        if(null == product) {
            throw new ResourceNotFoundEx("Không tìm thấy sản phẩm");
        }

        ProductDto productDto = productMapper.mapProductToDto(product);
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setCategoryTypeId(product.getCateType().getId());
        productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariants()));
        productDto.setProductImage(productMapper.mapProductImageListToDto(product.getImageList()));

//        // Handle null cateType
//        if (product.getCateType() != null) {
//            productDto.setCategoryTypeId(product.getCateType().getId());
//        } else {
//            productDto.setCategoryTypeId(null);
//        }

        return productDto;
    }

    @Override
    public ProductDto getProductById(Integer id) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundEx("Không tìm thấy sản phẩm"));

        ProductDto productDto = productMapper.mapProductToDto(product);
//        productDto.setCategoryId(product.getCategory().getId());
//        productDto.setCategoryTypeId(product.getCateType().getId());

        if (product.getCategory() != null) {
            productDto.setCategoryId(product.getCategory().getId());
            productDto.setCategoryName(product.getCategory().getName()); // Dòng này bị thiếu trước đó
        }

        if (product.getCateType() != null) {
            productDto.setCategoryTypeId(product.getCateType().getId());
            productDto.setCategoryTypeName(product.getCateType().getName()); // Dòng này bị thiếu trước đó
        }

        productDto.setVariants(productMapper.mapProductVariantListToDto(product.getProductVariants()));
        productDto.setProductImage(productMapper.mapProductImageListToDto(product.getImageList()));



        return productDto;
    }

    @Override
    public Product updateProduct(ProductDto productDto) {
        productRepository.findById(productDto
                        .getId())
                .orElseThrow(() -> new ResourceNotFoundEx("Không tìm thấy sản phẩm!"));

        return productRepository.save(productMapper.mapToProductEntity(productDto));
    }

    @Override
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundEx("Không tìm thấy sản phẩm!"));
        productRepository.delete(product);
    }

    @Override
    public Product fetchProductById(Integer id) throws Exception {
        return productRepository.findById(id).orElseThrow(BadRequestException::new);
    }

//    @Override
//    public long getProductCount() {
//        return productRepository.count();
//    }

}
