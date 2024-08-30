package com.todo.todoserver.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.todo.todoserver.model.User;
import com.todo.todoserver.model.request.UserRequest;
import com.todo.todoserver.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final JwtService jwtService;

  public User addUser(UserRequest user, Authentication auth) {
    String id = jwtService.getIdFromToken(auth);

    var newUser = User.builder()
    .authId(id)
    .username(user.getUsername())
    .email(user.getEmail())
    .profilePicture(user.getProfilePicture())
    .build();
    return userRepository.save(newUser);
  }

  public User getUser(Authentication auth) {
    Jwt jwt = (Jwt) auth.getPrincipal();
    String sub = jwt.getSubject();
    //Split the subject from | and get the last element
    String[] parts = sub.split("\\|");
    String id = parts[parts.length - 1];
    return userRepository.findByAuthId(id).orElseThrow();
  }

  
}
