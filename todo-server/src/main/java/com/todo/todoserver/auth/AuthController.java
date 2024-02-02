package com.todo.todoserver.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/auth")
@RequiredArgsConstructor
public class AuthController {


  private final AuthService authService;


  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest registerRequest) {
    return ResponseEntity.ok(authService.register(registerRequest));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest registerRequest) {
    return ResponseEntity.ok(authService.login(registerRequest));
  }
}
