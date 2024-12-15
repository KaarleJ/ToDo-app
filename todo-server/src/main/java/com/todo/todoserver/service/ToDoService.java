package com.todo.todoserver.service;

import com.todo.todoserver.dto.ToDoQueryParameters;
import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;

import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

public interface ToDoService {
    Page<ToDoResponse> getTodos(Authentication auth, ToDoQueryParameters queryParameters);

    ToDoResponse updateToDo(ToDoRequest toDoRequest, Long id, Authentication auth);

    ToDoResponse createToDo(ToDoRequest toDoRequest, Authentication auth);

    void deleteToDo(Long id, Authentication auth);
}
