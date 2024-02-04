package com.todo.todoserver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoserver.model.AuthRequest;
import com.todo.todoserver.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/auth")
@RequiredArgsConstructor
public class AuthController {


  private final AuthService authService;


  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody AuthRequest registerRequest) {
    try {
      return ResponseEntity.ok(authService.register(registerRequest));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error registering: " + e.getMessage());
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest registerRequest) {
    try {
      return ResponseEntity.ok(authService.login(registerRequest));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error logging in: " + e.getMessage());
    }
  }
}
