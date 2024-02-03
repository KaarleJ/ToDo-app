package com.todo.todoserver.auth;

import com.todo.todoserver.User.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
  
  private String jwt;

  private User user;

}
