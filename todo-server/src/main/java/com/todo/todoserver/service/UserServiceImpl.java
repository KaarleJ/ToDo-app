package com.todo.todoserver.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.todo.todoserver.dto.UserRequest;
import com.todo.todoserver.model.User;
import com.todo.todoserver.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final AuthorizationService authorizationService;

  public User addUser(UserRequest user) {
    String id = authorizationService.getUserId();

    var newUser = User.builder()
        .authId(id)
        .username(user.getUsername())
        .email(user.getEmail())
        .profilePicture(user.getProfilePicture())
        .build();
    return userRepository.save(newUser);
  }

  public User getUser() {
    String id = authorizationService.getUserId();
    return userRepository.findByAuthId(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
  }

}
