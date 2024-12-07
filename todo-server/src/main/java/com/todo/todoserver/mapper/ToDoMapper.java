package com.todo.todoserver.mapper;

import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.dto.UserResponse;
import com.todo.todoserver.model.ToDo;

public class ToDoMapper {

  public static ToDoResponse toResponse(ToDo todo) {
    UserResponse authorResponse = UserResponse.builder()
        .username(todo.getAuthor().getUsername())
        .build();

    return ToDoResponse.builder()
        .id(todo.getId())
        .title(todo.getTitle())
        .text(todo.getText())
        .status(todo.getStatus())
        .deadline(todo.getDeadline())
        .author(authorResponse)
        .build();
  }
}