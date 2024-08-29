package com.todo.todoserver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.todoserver.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
  
  Optional<User> findByUsername(String username);

  Optional<User> findById(Long id);

  Optional<User> findByAuthId(String authId);
}
