package com.todo.todoserver.repository.Custom;

import com.todo.todoserver.model.ToDo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomTodoRepository {
  Page<ToDo> findTodos(String authId, Boolean status, String search, Pageable pageable);
}
