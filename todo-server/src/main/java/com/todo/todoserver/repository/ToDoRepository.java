package com.todo.todoserver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.todo.todoserver.model.ToDo;

@Repository
public interface ToDoRepository
                extends JpaRepository<ToDo, Long> {

        Optional<List<ToDo>> findByAuthorId(Long id);

        @Query("SELECT t FROM ToDo t WHERE t.author.authId = :authId")
        Optional<List<ToDo>> findByAuthorAuthId(@Param("authId") String authId);

        @Query("SELECT t FROM ToDo t WHERE t.author.authId = :authId")
        Optional<List<ToDo>> findByAuthorAuthId(@Param("authId") String authId, Sort sort);

        @Query("SELECT t FROM ToDo t WHERE t.author.authId = :authId AND t.status = :status")
        Optional<List<ToDo>> findByAuthorAuthIdAndStatus(@Param("authId") String authId,
                        @Param("status") boolean status);

        @Query("SELECT t FROM ToDo t WHERE t.author.authId = :authId AND t.status = :status")
        Optional<List<ToDo>> findByAuthorAuthIdAndStatus(@Param("authId") String authId,
                        @Param("status") boolean status, Sort sort);
}
