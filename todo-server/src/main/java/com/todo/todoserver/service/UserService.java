package com.todo.todoserver.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.todo.todoserver.model.User;
import com.todo.todoserver.model.request.UserRequest;
import com.todo.todoserver.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final JwtExtractor jwtExtractor;

  public User addUser(UserRequest user, Authentication auth) {
    String id = jwtExtractor.getIdFromToken(auth);

    var newUser = User.builder()
        .authId(id)
        .username(user.getUsername())
        .email(user.getEmail())
        .profilePicture(user.getProfilePicture())
        .build();
    return userRepository.save(newUser);
  }

  public User getUser(Authentication auth) {
    String id = jwtExtractor.getIdFromToken(auth);
    return userRepository.findByAuthId(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
  }

}
