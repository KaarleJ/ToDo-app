package com.todo.todoserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.ToDoRequest;
import com.todo.todoserver.service.ToDoService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/todos")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public Optional<List<ToDo>> getTodos(HttpServletRequest req) {
        return toDoService.getTodos(req);
    }

    @PutMapping
    public ResponseEntity<?> updateToDo(@RequestBody ToDo toDo, HttpServletRequest req) {
        try {
            return ResponseEntity.ok(toDoService.updateToDo(toDo, req));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating todo: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addNewToDo(@RequestBody ToDoRequest treq, HttpServletRequest req) {
        try {
            return ResponseEntity.ok(toDoService.addNewToDo(treq, req));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding new todo: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteToDo(@PathVariable Long id, HttpServletRequest req) {
        try {
            toDoService.deleteToDo(id, req);
            return ResponseEntity.ok("Todo deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting todo: " + e.getMessage());
        }
    }
}
