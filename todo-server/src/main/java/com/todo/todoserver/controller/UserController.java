package com.todo.todoserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoserver.dto.UserRequest;
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
  public ResponseEntity<?> getUser(Authentication auth) {
    return ResponseEntity.ok(userService.getUser(auth));
  }

  @PostMapping
  public ResponseEntity<?> addNewUser(@RequestBody UserRequest ureq, Authentication auth) {
    return ResponseEntity.ok(userService.addUser(ureq, auth));
  }

}
