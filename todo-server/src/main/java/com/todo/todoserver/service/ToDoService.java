package com.todo.todoserver.service;

import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.model.ToDo;

import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

public interface ToDoService {
    Page<ToDo> getTodos(Authentication auth, String show, String sort, String search, int page, int size);

    ToDoResponse updateToDo(ToDoRequest toDoRequest, Long id, Authentication auth);

    ToDoResponse createToDo(ToDoRequest toDoRequest, Authentication auth);

    void deleteToDo(Long id, Authentication auth);
}
