package com.fit.backend.auth.config;

public final class EndPoints {
    private EndPoints() {}

    // Swagger
    public static final String[] SWAGGER = {
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/swagger-ui/**"
    };

    // Public GET API
    public static final String[] GET_API = {
            "/api/category",
            "/api/products",
            "/api/products/**",
            "/api/dashboard/**",
            "/api/brands",
            "/api/data/**",
            "/api/recommendations/**",
            "/images/**"
    };

    // Public POST API
    public static final String[] POST_API = {
            "/api/data/**",
            "/api/recommendations/**",
            "/api/address"
    };

    // Public GET API
    public static final String[] PUT_API = {

    };

    public static final String[] PUBLIC_API = {
            "/api/auth/**",
            "/api/orders/**"
    };

    // Public GOOLE LOGIN
    public static final String[] GOOGLE_LOGIN = {
            "/oauth2/success"
    };
}
