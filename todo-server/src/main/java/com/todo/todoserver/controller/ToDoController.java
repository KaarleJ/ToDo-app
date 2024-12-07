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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.service.ToDoService;
import com.todo.todoserver.service.ToDoServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "api/todos")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoServiceImpl toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public ResponseEntity<Page<ToDo>> getTodos(
            Authentication auth,
            @RequestParam(value = "show", required = false) String show,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(toDoService.getTodos(auth, show, sort, search, page - 1, size));
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
