package com.fit.backend.auth.repository;

import com.fit.backend.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailRepository extends JpaRepository<User, Integer> {
    User findByEmail(String username);
}