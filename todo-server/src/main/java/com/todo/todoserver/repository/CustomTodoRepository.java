package com.todo.todoserver.repository;

import com.todo.todoserver.model.ToDo;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface CustomTodoRepository {
  Optional<List<ToDo>> findTodos(String authId, Boolean status, String search, Sort sort);
}
