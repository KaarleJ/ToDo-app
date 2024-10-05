package com.todo.todoserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.repository.Custom.CustomTodoRepository;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long>, CustomTodoRepository {
}
