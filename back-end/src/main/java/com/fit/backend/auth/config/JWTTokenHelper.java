package com.fit.backend.auth.config;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTTokenHelper {
    @Value("${jwt.auth.app}")
    private String appName;

    @Value("${jwt.auth.secret_key}")
    private String secretKey;

    @Value("${jwt.auth.expires_in}")
    private int expiresIn;

    public String generateToken(String userName){
        return Jwts.builder()
                .issuer(appName)
                .subject(userName)
                .issuedAt(new Date())
                .expiration(generateExpirationDate())
                .signWith(getSigningKey())
                .compact();
    }
}
