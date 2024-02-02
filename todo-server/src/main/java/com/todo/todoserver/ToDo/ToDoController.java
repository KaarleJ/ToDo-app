package com.todo.todoserver.ToDo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/todos")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public List<ToDo> getTodos() {
        return toDoService.getTodos();
    }

    @PutMapping
    public ResponseEntity<?> updateToDo(@RequestBody ToDo toDo) {
        try {
            ToDo updatedTodo = toDoService.updateToDo(toDo);
            return ResponseEntity.ok(updatedTodo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating todo: " + e.getMessage());
        }
    }
}
