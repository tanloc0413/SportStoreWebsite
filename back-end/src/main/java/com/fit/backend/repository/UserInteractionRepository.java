package com.fit.backend.repository;

import com.fit.backend.entity.UserInteraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserInteractionRepository extends JpaRepository<UserInteraction, Integer> {

    List<UserInteraction> findByUserIdOrderByInteractionTimeDesc(Integer userId);

    List<UserInteraction> findBySessionIdOrderByInteractionTimeDesc(String sessionId);

    @Query("SELECT ui FROM UserInteraction ui WHERE ui.userId = :userId OR ui.sessionId = :sessionId ORDER BY ui.interactionTime DESC")
    List<UserInteraction> findByUserIdOrSessionIdOrderByInteractionTimeDesc(@Param("userId") Integer userId, @Param("sessionId") String sessionId);

    @Query("SELECT ui FROM UserInteraction ui WHERE ui.interactionTime >= :fromDate ORDER BY ui.interactionTime DESC")
    List<UserInteraction> findRecentInteractions(@Param("fromDate") LocalDateTime fromDate);

    @Query("SELECT ui.product.id, COUNT(ui) as interactionCount FROM UserInteraction ui " +
            "WHERE ui.interactionTime >= :fromDate " +
            "GROUP BY ui.product.id " +
            "ORDER BY interactionCount DESC")
    List<Object[]> findMostPopularProducts(@Param("fromDate") LocalDateTime fromDate);

    @Query("SELECT DISTINCT ui.userId FROM UserInteraction ui " +
            "WHERE ui.product.id = :productId AND ui.userId IS NOT NULL")
    List<Integer> findUserIdsWhoInteractedWithProduct(@Param("productId") Integer productId);

    @Query("SELECT ui.product.id, AVG(ui.weight) as avgWeight FROM UserInteraction ui " +
            "WHERE ui.userId = :userId " +
            "GROUP BY ui.product.id " +
            "ORDER BY avgWeight DESC")
    List<Object[]> findUserProductPreferences(@Param("userId") Integer userId);

    @Query("SELECT ui.product.id, SUM(ui.weight) as totalWeight FROM UserInteraction ui " +
            "WHERE ui.sessionId = :sessionId " +
            "GROUP BY ui.product.id " +
            "ORDER BY totalWeight DESC")
    List<Object[]> findSessionProductPreferences(@Param("sessionId") String sessionId);

    @Query("SELECT ui1.userId, ui2.userId, COUNT(*) as commonProducts FROM UserInteraction ui1 " +
            "JOIN UserInteraction ui2 ON ui1.product.id = ui2.product.id " +
            "WHERE ui1.userId != ui2.userId AND ui1.userId = :userId " +
            "GROUP BY ui1.userId, ui2.userId " +
            "ORDER BY commonProducts DESC")
    List<Object[]> findSimilarUsers(@Param("userId") Integer userId);

    // Tìm các tương tác SEARCH có chứa keyword tương tự
    @Query("SELECT ui FROM UserInteraction ui WHERE ui.interactionType = 'SEARCH' " +
            "AND LOWER(ui.searchKeyword) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<UserInteraction> findBySearchKeywordContaining(@Param("keyword") String keyword);

    // Tìm các từ khóa tìm kiếm phổ biến
    @Query("SELECT ui.searchKeyword, COUNT(ui) as searchCount FROM UserInteraction ui " +
            "WHERE ui.interactionType = 'SEARCH' AND ui.searchKeyword IS NOT NULL " +
            "GROUP BY ui.searchKeyword " +
            "ORDER BY searchCount DESC")
    List<Object[]> findPopularSearchKeywords();
}