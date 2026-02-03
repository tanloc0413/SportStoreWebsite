package com.fit.backend.auth.service;

import com.fit.backend.auth.entity.User;
import com.fit.backend.auth.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuth2Service {
    @Autowired
    UserDetailRepository userDetailRepository;

    @Autowired
    private AuthorityService authorityService;

    public User getUser(String userName) {
        return userDetailRepository.findByEmail(userName);
    }

    public User createUser(OAuth2User oAuth2User, String provider) {
        String fullName = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");
        User user= User.builder()
                .fullName(fullName)
                .email(email)
                .provider(provider)
                .enable(true)
                .authorities(authorityService.getUserAuthority())
                .build();
        return userDetailRepository.save(user);
    }
}
