package com.fit.backend.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize)-> authorize
                        // swagger
                        .requestMatchers(EndPoints.SWAGGER).permitAll()
                        // lấy sản phẩm và thể loại - allow public access
                        .requestMatchers(HttpMethod.GET, EndPoints.GET_API).permitAll()
                        .requestMatchers(HttpMethod.POST, EndPoints.POST_API).permitAll() 
                        .requestMatchers(HttpMethod.PUT, EndPoints.PUT_API).permitAll()
                        .requestMatchers(EndPoints.PUBLIC_API).permitAll()
                        .requestMatchers(EndPoints.GOOGLE_LOGIN).permitAll()
                        .anyRequest().authenticated())
                        .oauth2Login(
                                (oauth2login) -> oauth2login
                                        .defaultSuccessUrl("http://localhost:3000/oauth2/callback")
                                        .loginPage("/oauth2/authorization/google")
                        )
                        .exceptionHandling(ex -> ex
                                .authenticationEntryPoint((request, response, authException) -> {
                                    // Don't redirect API calls to login
                                    String requestURI = request.getRequestURI();
                                    if (requestURI.startsWith("/api/")) {
                                        response.sendError(401, "Unauthorized");
                                    } else {
                                        response.sendRedirect("/oauth2/authorization/google");
                                    }
                                })
                        )
                        .addFilterBefore(
                                new JWTAuthenticationFilter(jwtTokenHelper, userDetailsService),
                                UsernamePasswordAuthenticationFilter.class
                        );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());

        return authManagerBuilder.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(EndPoints.PUBLIC_API);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
