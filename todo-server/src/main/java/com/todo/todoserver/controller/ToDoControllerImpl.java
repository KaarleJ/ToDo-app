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

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.request.ToDoRequest;
import com.todo.todoserver.service.IToDoService;
import com.todo.todoserver.service.ToDoServiceImpl;

@RestController
@RequestMapping(path = "api/todos")
public class ToDoControllerImpl implements IToDoController {

    private final IToDoService toDoService;

    @Autowired
    public ToDoControllerImpl(ToDoServiceImpl toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public ResponseEntity<Page<ToDo>> getTodos(
            Authentication auth,
            @RequestParam(value = "show", required = false) String show,
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(toDoService.getTodos(auth, show, sort, search, page, size));
    }

    @PutMapping
    public ResponseEntity<ToDo> updateToDo(@RequestBody ToDo toDo, Authentication auth) {
        return ResponseEntity.ok(toDoService.updateToDo(toDo, auth));
    }

    @PostMapping
    public ResponseEntity<ToDo> addNewToDo(@RequestBody ToDoRequest treq, Authentication auth) {
        return ResponseEntity.ok(toDoService.addNewToDo(treq, auth));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable Long id, Authentication auth) {
        toDoService.deleteToDo(id, auth);
        return ResponseEntity.ok("Todo deleted");
    }
}
