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
            "/api/dashboard/**",
            "/api/brands",
            "/api/data/**",
            "/api/recommendations/**",
            "/images/**"
    };

    // Public GET API
    public static final String[] POST_API = {
            "/api/data/**",
            "/api/recommendations/**",

    };

    // Public GET API
    public static final String[] PUT_API = {

    };

    public static final String[] PUBLIC_API = {
            "/api/auth/**",
            "/api/orders/**"
    };
}
