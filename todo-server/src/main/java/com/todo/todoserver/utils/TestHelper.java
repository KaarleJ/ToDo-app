package com.todo.todoserver.utils;

import java.time.LocalDate;

import com.github.javafaker.Faker;
import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.dto.UserRequest;
import com.todo.todoserver.dto.UserResponse;
import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.User;

public class TestHelper {
  private static final Faker faker = new Faker();

  public static ToDo createToDo() {
    return ToDo.builder()
        .id(faker.number().randomNumber())
        .title(faker.lorem().sentence())
        .text(faker.lorem().paragraph())
        .author(createUser())
        .deadline(LocalDate.now().plusDays(faker.number().numberBetween(1, 30)))
        .status(faker.bool().bool())
        .build();
  }

  public static ToDoRequest createToDoRequest() {
    return ToDoRequest.builder()
        .title(faker.lorem().sentence())
        .text(faker.lorem().paragraph())
        .deadline(LocalDate.now().plusDays(faker.number().numberBetween(1, 30)))
        .status(faker.bool().bool())
        .build();
  }

  public static ToDoResponse createToDoResponse() {
    return ToDoResponse.builder()
        .id(faker.number().randomNumber())
        .title(faker.lorem().sentence())
        .text(faker.lorem().paragraph())
        .author(createUserResponse())
        .deadline(LocalDate.now().plusDays(faker.number().numberBetween(1, 30)))
        .status(faker.bool().bool())
        .build();
  }

  public static UserResponse createUserResponse() {
    return UserResponse.builder()
        .id(faker.number().randomNumber())
        .username(faker.name().username())
        .email(faker.internet().emailAddress())
        .build();
  }

  public static UserRequest createUserRequest() {
    return UserRequest.builder()
        .username(faker.name().username())
        .email(faker.internet().emailAddress())
        .build();
  }

  public static User createUser() {
    return User.builder()
        .id(faker.number().randomNumber())
        .authId(faker.idNumber().valid())
        .username(faker.name().username())
        .email(faker.internet().emailAddress())
        .profilePicture(faker.internet().avatar())
        .build();
  }
}
