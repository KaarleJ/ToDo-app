package com.todo.todoserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoserver.dto.ToDoQueryParameters;
import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.service.ToDoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "api/todos")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public ResponseEntity<Page<ToDoResponse>> getTodos(
            Authentication auth,
            @Valid ToDoQueryParameters queryParameters) {
        return ResponseEntity.ok(toDoService.getTodos(auth, queryParameters));
    }

    @PostMapping
    public ResponseEntity<ToDoResponse> createToDo(@RequestBody @Valid ToDoRequest treq, Authentication auth) {
        return ResponseEntity.ok(toDoService.createToDo(treq, auth));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDoResponse> updateToDo(@PathVariable Long id, @RequestBody @Valid ToDoRequest toDoRequest,
            Authentication auth) {
        return ResponseEntity.ok(toDoService.updateToDo(toDoRequest, id, auth));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable Long id, Authentication auth) {
        toDoService.deleteToDo(id, auth);
        return ResponseEntity.ok("Todo deleted");
    }
}
