package com.todo.todoserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.request.ToDoRequest;
import com.todo.todoserver.service.ToDoService;

@RestController
@RequestMapping(path = "api/todos")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public ResponseEntity<?> getTodos(Authentication auth) {
        try {
            return ResponseEntity.ok(toDoService.getTodos(auth));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching todo: " + e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateToDo(@RequestBody ToDo toDo, Authentication auth) {
        try {
            return ResponseEntity.ok(toDoService.updateToDo(toDo, auth));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating todo: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addNewToDo(@RequestBody ToDoRequest treq, Authentication auth) {
        try {
            return ResponseEntity.ok(toDoService.addNewToDo(treq, auth));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding new todo: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteToDo(@PathVariable Long id, Authentication auth) {
        try {
            toDoService.deleteToDo(id, auth);
            return ResponseEntity.ok("Todo deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting todo: " + e.getMessage());
        }
    }
}
