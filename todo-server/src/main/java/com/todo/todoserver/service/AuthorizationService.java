package com.todo.todoserver.service;

import org.springframework.security.core.Authentication;
import com.todo.todoserver.model.ToDo;

public interface AuthorizationService {

  public String getUserIdFromAuth(Authentication auth);

  public ToDo verifyToDoOwnership(Long toDoId, String authId);
}
