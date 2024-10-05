package com.todo.todoserver.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.repository.ToDoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthorizationService {
  private final ToDoRepository toDoRepository;
  private final JwtExtractor jwtExtractor;

  public String getUserIdFromAuth(Authentication auth) {
    return jwtExtractor.getIdFromToken(auth);
  }

  public ToDo verifyToDoOwnership(Long toDoId, String authId) {
    ToDo todo = toDoRepository.findById(toDoId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ToDo not found"));

    if (!todo.getAuthor().getAuthId().equals(authId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not the author of this ToDo");
    }

    return todo;
  }
}
