package com.fit.backend.auth.service;

import com.fit.backend.auth.entity.Authority;
import com.fit.backend.auth.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorityService {
    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthority() {
        List<Authority> authorities = new ArrayList<>();
        Authority authority = authorityRepository.findByRoleCode("user");

        if (authority == null) {
            authority = authorityRepository.save(
                    Authority.builder()
                            .roleCode("user")
                            .roleName("user")
                            .build()
            );
        }

        authorities.add(authority);
        return authorities;
    }

    public Authority createAuthority(String role, String roleName) {
        Authority authority= Authority.builder().roleCode(role).roleName(roleName).build();
        return authorityRepository.save(authority);
    }
}