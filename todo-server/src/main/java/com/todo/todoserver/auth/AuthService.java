package com.todo.todoserver.auth;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.todo.todoserver.User.Role;
import com.todo.todoserver.User.User;
import com.todo.todoserver.User.UserRepository;
import com.todo.todoserver.config.JwtService;

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
            .build();
    }
}
