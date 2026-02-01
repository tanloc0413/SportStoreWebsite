package com.fit.backend.auth.repository;

import com.fit.backend.auth.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Authority findByRoleCode(String user);
}