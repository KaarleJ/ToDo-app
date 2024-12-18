package com.todo.todoserver.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class JwtExtractor {
  public String getIdFromToken(Authentication auth) {
    if (auth == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }
    Jwt jwt = (Jwt) auth.getPrincipal();
    String sub = jwt.getSubject();
    String[] parts = sub.split("\\|");
    return parts[parts.length - 1];
  }
}
