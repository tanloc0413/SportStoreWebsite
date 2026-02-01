package com.fit.backend.auth.config;

import com.fit.backend.auth.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize)-> authorize
                        // swagger
                        .requestMatchers(EndPoints.SWAGGER).permitAll()
                        // lấy sản phẩm và thể loại
                        .requestMatchers(HttpMethod.GET, EndPoints.GET_API).permitAll()
                        .requestMatchers(HttpMethod.POST, EndPoints.POST_API).permitAll()
                        .requestMatchers(HttpMethod.PUT, EndPoints.PUT_API).permitAll()
//                        .requestMatchers("/oauth2/success").permitAll()
                        // auth endpoints
                        .anyRequest().authenticated());
//                .oauth2Login((oauth2login)-> oauth2login.defaultSuccessUrl("/oauth2/success").loginPage("/oauth2/authorization/google"))
        //.exceptionHandling((exception)-> exception.authenticationEntryPoint(new RESTAuthenticationEntryPoint()))
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider daoAuthenticationProvider= new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(daoAuthenticationProvider);

    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring().requestMatchers(EndPoints.PUBLIC_API);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
