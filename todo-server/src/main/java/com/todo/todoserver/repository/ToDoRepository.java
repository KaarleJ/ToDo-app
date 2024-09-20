package com.todo.todoserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.todoserver.model.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long>, CustomTodoRepository {
}
