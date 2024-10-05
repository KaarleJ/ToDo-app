package com.todo.todoserver.controller;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.request.ToDoRequest;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IToDoController {
    ResponseEntity<Page<ToDo>> getTodos(Authentication auth, String show, String sort, String search, int page, int size);
    ResponseEntity<ToDo> updateToDo(ToDo toDo, Authentication auth);
    ResponseEntity<ToDo> addNewToDo(ToDoRequest treq, Authentication auth);
    ResponseEntity<String> deleteToDo(Long id, Authentication auth);
}
