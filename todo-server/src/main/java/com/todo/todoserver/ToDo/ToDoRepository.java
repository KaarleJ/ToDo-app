package com.todo.todoserver.ToDo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepository
        extends JpaRepository<ToDo, Long> {


        Optional<List<ToDo>> findByAuthorId(Long id);
}
