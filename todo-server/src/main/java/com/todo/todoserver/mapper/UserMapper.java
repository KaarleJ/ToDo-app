package com.todo.todoserver.mapper;

import com.todo.todoserver.dto.UserResponse;
import com.todo.todoserver.model.User;

public class UserMapper {

  public static UserResponse toResponse(User user) {
    return UserResponse.builder()
        .id(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
        .profilePicture(user.getProfilePicture())
        .build();
  }
}
