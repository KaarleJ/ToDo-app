package com.todo.todoserver.service;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.request.ToDoRequest;

import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;


public interface IToDoService {
    Page<ToDo> getTodos(Authentication auth, String show, String sort, String search, int page, int size);
    ToDo updateToDo(ToDo oldTodo, Authentication auth);
    ToDo addNewToDo(ToDoRequest treq, Authentication auth);
    void deleteToDo(Long id, Authentication auth);
}
