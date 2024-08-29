package com.todo.todoserver.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

public class JwtService {
  public String getIdFromToken(Authentication auth) {
    Jwt jwt = (Jwt) auth.getPrincipal();
    String sub = jwt.getSubject();
    //Split the subject from | and get the last element
    String[] parts = sub.split("\\|");
    return parts[parts.length - 1];
  }
}
