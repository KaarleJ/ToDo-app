package com.todo.todoserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.MappedJwtClaimSetConverter;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.beans.factory.annotation.Value;
import java.util.Collections;

/**
 * Configures our application with Spring Security to restrict access to our API
 * endpoints.
 */
@Configuration
public class SecurityConfiguration {

  @Value("${okta.oauth2.issuer}")
  private String issuerUri;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    /*
     * This is where we configure the security required for our endpoints and setup
     * our app to serve as
     * an OAuth2 Resource Server, using JWT validation.
     */
    return http
        .authorizeHttpRequests((authorize) -> authorize
            .requestMatchers("/").permitAll()
            .requestMatchers("/api/todos").hasAuthority("SCOPE_access:todos"))
        .cors(withDefaults())
        .oauth2ResourceServer(oauth2 -> oauth2
            .jwt(withDefaults()))
        .build();
  }
}
