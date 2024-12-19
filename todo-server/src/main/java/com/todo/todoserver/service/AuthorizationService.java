package com.todo.todoserver.service;

import com.todo.todoserver.model.ToDo;

public interface AuthorizationService {

  public String getUserId();

  public ToDo verifyToDoOwnership(Long toDoId);
}
