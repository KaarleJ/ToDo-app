package com.todo.todoserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoserver.dto.UserRequest;
import com.todo.todoserver.dto.UserResponse;
import com.todo.todoserver.mapper.UserMapper;
import com.todo.todoserver.service.UserService;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<UserResponse> getUser() {
    return ResponseEntity.ok(UserMapper.toResponse(userService.getUser()));
  }

  @PostMapping
  public ResponseEntity<UserResponse> addNewUser(@RequestBody UserRequest ureq) {
    return ResponseEntity.ok(UserMapper.toResponse(userService.addUser(ureq)));
  }

}
