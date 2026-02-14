package com.fit.backend.service;

import com.fit.backend.dto.ProductRecommendationDto;
import com.fit.backend.entity.Product;
import com.fit.backend.entity.UserInteraction;
import com.fit.backend.repository.ProductRepository;
import com.fit.backend.repository.UserInteractionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {

    private final UserInteractionRepository userInteractionRepository;
    private final ProductRepository productRepository;

    /**
     * Collaborative Filtering - User-Based Recommendation
     * Gợi ý sản phẩm dựa trên người dùng tương tự
     */
    public List<ProductRecommendationDto> getCollaborativeRecommendations(Integer userId, String sessionId, int limit) {
        log.info("Getting collaborative recommendations for userId: {}, sessionId: {}", userId, sessionId);

        // Lấy lịch sử tương tác của user hiện tại
        List<UserInteraction> userInteractions = getUserInteractions(userId, sessionId);
        if (userInteractions.isEmpty()) {
            return getPopularProducts(limit); // Fallback cho user mới
        }

        // Tìm những user tương tự
        Map<Integer, Double> similarUsers = findSimilarUsers(userId, userInteractions);

        // Gợi ý sản phẩm từ những user tương tự
        Set<Integer> recommendedProductIds = new HashSet<>();
        Map<Integer, Double> productScores = new HashMap<>();

        for (Map.Entry<Integer, Double> entry : similarUsers.entrySet()) {
            Integer similarUserId = entry.getKey();
            Double similarity = entry.getValue();

            List<UserInteraction> similarUserInteractions =
                    userInteractionRepository.findByUserIdOrderByInteractionTimeDesc(similarUserId);

            for (UserInteraction interaction : similarUserInteractions) {
                Integer productId = interaction.getProduct().getId();

                // Không gợi ý sản phẩm đã tương tác
                if (!hasInteractedWithProduct(userInteractions, productId)) {
                    double score = similarity * interaction.getWeight();
                    productScores.merge(productId, score, Double::sum);
                    recommendedProductIds.add(productId);
                }
            }
        }

        // Sắp xếp theo điểm số và trả về
        return productScores.entrySet().stream()
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .limit(limit)
                .map(entry -> convertToRecommendationDto(
                        entry.getKey(), entry.getValue(),
                        "Dựa trên người dùng tương tự")
                )
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    /**
     * Item-Based Collaborative Filtering
     * Gợi ý sản phẩm tương tự với những sản phẩm đã tương tác
     */
    public List<ProductRecommendationDto> getItemBasedRecommendations(Integer userId, String sessionId, int limit) {
        log.info("Getting item-based recommendations for userId: {}, sessionId: {}", userId, sessionId);

        List<UserInteraction> userInteractions = getUserInteractions(userId, sessionId);
        if (userInteractions.isEmpty()) {
            return getPopularProducts(limit);
        }

        Map<Integer, Double> productScores = new HashMap<>();

        // Lấy những sản phẩm user đã tương tác với điểm số cao
        List<Integer> preferredProductIds = userInteractions.stream()
                .filter(ui -> ui.getWeight() >= 2.0) // Chỉ lấy tương tác có ý nghĩa
                .map(ui -> ui.getProduct().getId())
                .distinct()
                .collect(Collectors.toList());

        for (Integer productId : preferredProductIds) {
            // Tìm những user đã tương tác với sản phẩm này
            List<Integer> otherUserIds = userInteractionRepository
                    .findUserIdsWhoInteractedWithProduct(productId);

            // Tìm những sản phẩm khác mà những user này đã tương tác
            for (Integer otherUserId : otherUserIds) {
                if (Objects.equals(otherUserId, userId)) continue;

                List<UserInteraction> otherUserInteractions =
                        userInteractionRepository.findByUserIdOrderByInteractionTimeDesc(otherUserId);

                for (UserInteraction interaction : otherUserInteractions) {
                    Integer otherProductId = interaction.getProduct().getId();

                    if (!hasInteractedWithProduct(userInteractions, otherProductId)
                            && !Objects.equals(otherProductId, productId)) {

                        double score = interaction.getWeight() * 0.5; // Giảm trọng số so với user-based
                        productScores.merge(otherProductId, score, Double::sum);
                    }
                }
            }
        }

        return productScores.entrySet().stream()
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .limit(limit)
                .map(entry -> convertToRecommendationDto(entry.getKey(), entry.getValue(), "Sản phẩm tương tự"))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    /**
     * Hybrid Recommendation
     * Kết hợp nhiều phương pháp gợi ý
     */
    public List<ProductRecommendationDto> getHybridRecommendations(Integer userId, String sessionId, int limit) {
        log.info("Getting hybrid recommendations for userId: {}, sessionId: {}", userId, sessionId);

        List<ProductRecommendationDto> recommendations = new ArrayList<>();

        // 50% Collaborative Filtering
        List<ProductRecommendationDto> collaborative =
                getCollaborativeRecommendations(userId, sessionId, limit / 2);
        recommendations.addAll(collaborative);

        // 30% Item-Based
        List<ProductRecommendationDto> itemBased =
                getItemBasedRecommendations(userId, sessionId, limit / 3);
        recommendations.addAll(itemBased);

        // 20% Popular Products (Content-Based)
        List<ProductRecommendationDto> popular = getPopularProducts(limit / 5);
        recommendations.addAll(popular);

        // Loại bỏ duplicate và sắp xếp theo score
        Map<Integer, ProductRecommendationDto> uniqueRecommendations = new LinkedHashMap<>();

        for (ProductRecommendationDto rec : recommendations) {
            if (!uniqueRecommendations.containsKey(rec.getProductId()) ||
                    uniqueRecommendations.get(rec.getProductId()).getRecommendationScore() < rec.getRecommendationScore()) {
                uniqueRecommendations.put(rec.getProductId(), rec);
            }
        }

        return uniqueRecommendations.values().stream()
                .sorted((r1, r2) -> Double.compare(r2.getRecommendationScore(), r1.getRecommendationScore()))
                .limit(limit)
                .collect(Collectors.toList());
    }

    /**
     * Lưu tương tác của user
     */
    public void saveUserInteraction(Integer userId, String sessionId, Integer productId,
                                    UserInteraction.InteractionType type, String searchKeyword) {

        Product product = productRepository.findById(productId).orElse(null);
//        if (product == null) return;

        if (product == null) {
            log.warn("Cannot save interaction: Product ID {} not found", productId);
            return;
        }

        UserInteraction interaction = UserInteraction.builder()
                .userId(userId)
                .sessionId(sessionId)
                .product(product)
                .interactionType(type)
                .searchKeyword(searchKeyword)
                .build();

        userInteractionRepository.save(interaction);
        log.info("Saved interaction: userId={}, sessionId={}, productId={}, type={}",
                userId, sessionId, productId, type);
    }

    /**
     * Helper Methods
     */
    private List<UserInteraction> getUserInteractions(Integer userId, String sessionId) {
        if (userId != null) {
            return userInteractionRepository.findByUserIdOrderByInteractionTimeDesc(userId);
        } else if (sessionId != null) {
            return userInteractionRepository.findBySessionIdOrderByInteractionTimeDesc(sessionId);
        }
        return new ArrayList<>();
    }

    private Map<Integer, Double> findSimilarUsers(Integer userId, List<UserInteraction> userInteractions) {
        Map<Integer, Double> similarUsers = new HashMap<>();

        // Lấy danh sách sản phẩm user đã tương tác
        Set<Integer> userProductIds = userInteractions.stream()
                .map(ui -> ui.getProduct().getId())
                .collect(Collectors.toSet());

        // Tìm các user khác có tương tác với những sản phẩm tương tự
        for (Integer productId : userProductIds) {
            List<Integer> otherUserIds = userInteractionRepository
                    .findUserIdsWhoInteractedWithProduct(productId);

            for (Integer otherUserId : otherUserIds) {
                if (!Objects.equals(otherUserId, userId) && otherUserId != null) {
                    similarUsers.merge(otherUserId, 1.0, Double::sum);
                }
            }
        }

        return similarUsers.entrySet().stream()
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .limit(10) // Top 10 similar users
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue() / userProductIds.size(), // Normalize similarity
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }

    private boolean hasInteractedWithProduct(List<UserInteraction> interactions, Integer productId) {
        return interactions.stream()
                .anyMatch(ui -> Objects.equals(ui.getProduct().getId(), productId));
    }

    private ProductRecommendationDto convertToRecommendationDto(Integer productId, Double score, String reason) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) return null;

        String imageUrl = product.getImageList() != null && !product.getImageList().isEmpty()
                ? product.getImageList().get(0).getUrl()
                : "https://via.placeholder.com/400x400?text=No+Image";

        return ProductRecommendationDto.builder()
                .productId(product.getId())
                .productName(product.getName())
                .price(product.getPrice() != null ? product.getPrice().doubleValue() : 0.0)
                .imageUrl(imageUrl)
                .slug(product.getSlug())
                .recommendationScore(score)
                .reason(reason)
                .build();
    }

    private List<ProductRecommendationDto> getPopularProducts(int limit) {
        LocalDateTime fromDate = LocalDateTime.now().minusDays(30);
        List<Object[]> popularProducts = userInteractionRepository
                .findMostPopularProducts(fromDate);

        return popularProducts.stream()
                .limit(limit)
                .map(row -> {
                    Integer productId = ((Number) row[0]).intValue();
                    Integer interactionCount = (Integer) row[1];
                    return convertToRecommendationDto(productId, interactionCount.doubleValue(), "Sản phẩm phổ biến");
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}