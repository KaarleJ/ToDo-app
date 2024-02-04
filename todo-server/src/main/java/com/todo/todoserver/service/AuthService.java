package com.todo.todoserver.service;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.todo.todoserver.model.AuthRequest;
import com.todo.todoserver.model.AuthResponse;
import com.todo.todoserver.model.Role;
import com.todo.todoserver.model.User;
import com.todo.todoserver.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(AuthRequest req) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        var user = userRepository.findByUsername(req.getUsername()).orElseThrow();

        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder()
            .jwt(jwt)
            .user(user)
            .build();
    }

    public AuthResponse register(AuthRequest req) {

        var user = User.builder()
            .username(req.getUsername())
            .password(passwordEncoder.encode(req.getPassword()))
            .role(Role.USER)
            .build();

        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder()
            .jwt(jwt)
            .user(user)
            .build();
    }
}
