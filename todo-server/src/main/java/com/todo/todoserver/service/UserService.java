package com.todo.todoserver.service;

import org.springframework.security.core.Authentication;

import com.todo.todoserver.dto.UserRequest;
import com.todo.todoserver.model.User;

public interface UserService {
  public User addUser(UserRequest user, Authentication auth);

  public User getUser(Authentication auth);
}