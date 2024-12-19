package com.todo.todoserver.service;

import com.todo.todoserver.dto.ToDoQueryParameters;
import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;

import org.springframework.data.domain.Page;

public interface ToDoService {
    Page<ToDoResponse> getTodos(ToDoQueryParameters queryParameters);

    ToDoResponse updateToDo(ToDoRequest toDoRequest, Long id);

    ToDoResponse createToDo(ToDoRequest toDoRequest);

    void deleteToDo(Long id);
}
