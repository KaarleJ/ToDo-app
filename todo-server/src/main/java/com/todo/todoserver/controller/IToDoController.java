package com.todo.todoserver.controller;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.request.ToDoRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IToDoController {
    ResponseEntity<List<ToDo>> getTodos(Authentication auth, String show, String sort, String search);
    ResponseEntity<ToDo> updateToDo(ToDo toDo, Authentication auth);
    ResponseEntity<ToDo> addNewToDo(ToDoRequest treq, Authentication auth);
    ResponseEntity<String> deleteToDo(Long id, Authentication auth);
}
