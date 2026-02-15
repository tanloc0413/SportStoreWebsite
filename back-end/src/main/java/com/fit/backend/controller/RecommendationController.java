package com.fit.backend.controller;

import com.fit.backend.dto.ProductRecommendationDto;
import com.fit.backend.entity.UserInteraction;
import com.fit.backend.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RecommendationController {

    private final RecommendationService recommendationService;

    /**
     * Lấy gợi ý sản phẩm dựa trên Collaborative Filtering
     */
    @GetMapping("/collaborative")
    public ResponseEntity<List<ProductRecommendationDto>> getCollaborativeRecommendations(
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String sessionId,
            @RequestParam(defaultValue = "12") int limit) {

        List<ProductRecommendationDto> recommendations =
                recommendationService.getCollaborativeRecommendations(userId, sessionId, limit);
        return ResponseEntity.ok(recommendations);
    }

    /**
     * Lấy gợi ý sản phẩm dựa trên Item-Based Filtering
     */
    @GetMapping("/item-based")
    public ResponseEntity<List<ProductRecommendationDto>> getItemBasedRecommendations(
            @RequestParam(required = false) Integer userId,
            @RequestParam(defaultValue = "12") int limit,
            HttpServletRequest request) {

        String sessionId = request.getSession().getId();

        List<ProductRecommendationDto> recommendations =
                recommendationService.getItemBasedRecommendations(userId, sessionId, limit);

        return ResponseEntity.ok(recommendations);
    }

    /**
     * Lấy gợi ý sản phẩm Hybrid (kết hợp nhiều phương pháp)
     */
    @GetMapping("/hybrid")
    public ResponseEntity<List<ProductRecommendationDto>> getHybridRecommendations(
            @RequestParam(required = false) Integer userId,
            @RequestParam(defaultValue = "20") int limit,
            HttpServletRequest request) {

        String sessionId = request.getSession().getId();

        List<ProductRecommendationDto> recommendations =
                recommendationService.getHybridRecommendations(userId, sessionId, limit);

        return ResponseEntity.ok(recommendations);
    }

    /**
     * Lưu tương tác xem sản phẩm
     */
    @PostMapping("/interactions/view")
    public ResponseEntity<String> saveProductView(
            @RequestParam Integer productId,
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String sessionId) { // Nhận từ Client

        recommendationService.saveUserInteraction(
                userId, sessionId, productId,
                UserInteraction.InteractionType.VIEW, null);
        return ResponseEntity.ok("View saved");
    }

    /**
     * Lưu tương tác tìm kiếm
     */
    @PostMapping("/interactions/search")
    public ResponseEntity<String> saveSearchInteraction(
            @RequestParam String keyword,
            @RequestParam(required = false) Integer productId,
            @RequestParam(required = false) Integer userId,
            HttpServletRequest request) {

        String sessionId = request.getSession().getId();

        recommendationService.saveUserInteraction(
                userId, sessionId, productId,
                UserInteraction.InteractionType.SEARCH, keyword);

        return ResponseEntity.ok("Search interaction recorded");
    }

    /**
     * Lưu tương tác thêm vào giỏ hàng
     */
    @PostMapping("/interactions/add-to-cart")
    public ResponseEntity<String> saveAddToCartInteraction(
            @RequestParam Integer productId,
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String sessionId) {

        recommendationService.saveUserInteraction(
                userId, sessionId, productId,
                UserInteraction.InteractionType.ADD_TO_CART, null);
        return ResponseEntity.ok("Add-to-cart saved");
    }

    /**
     * Lưu tương tác mua hàng
     */
    @PostMapping("/interactions/purchase")
    public ResponseEntity<String> savePurchaseInteraction(
            @RequestParam Integer productId,
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) String sessionId) {

        recommendationService.saveUserInteraction(
                userId, sessionId, productId,
                UserInteraction.InteractionType.PURCHASE, null);
        return ResponseEntity.ok("Purchase saved");
    }

    /**
     * Lưu tương tác yêu thích
     */
    @PostMapping("/interactions/favorite")
    public ResponseEntity<String> saveFavoriteInteraction(
            @RequestParam Integer productId,
            @RequestParam(required = false) Integer userId,
            HttpServletRequest request) {

        String sessionId = request.getSession().getId();

        recommendationService.saveUserInteraction(
                userId, sessionId, productId,
                UserInteraction.InteractionType.FAVORITE, null);

        return ResponseEntity.ok("Favorite interaction recorded");
    }
}