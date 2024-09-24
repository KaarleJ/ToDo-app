package com.todo.todoserver.service;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.request.ToDoRequest;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

public interface IToDoService {
    Optional<List<ToDo>> getTodos(Authentication auth, String show, String sort, String search);
    ToDo updateToDo(ToDo oldTodo, Authentication auth);
    ToDo addNewToDo(ToDoRequest treq, Authentication auth);
    void deleteToDo(Long id, Authentication auth);
}
