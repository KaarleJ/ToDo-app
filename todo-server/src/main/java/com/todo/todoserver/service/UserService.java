package com.todo.todoserver.service;

import com.todo.todoserver.dto.UserRequest;
import com.todo.todoserver.model.User;

public interface UserService {
  public User addUser(UserRequest user);

  public User getUser();
}