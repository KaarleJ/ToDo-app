package com.todo.todoserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todoserver.model.UserRequest;
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
    try {
      return ResponseEntity.ok(userService.getUser(auth));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error adding fetching user: " + e.getMessage());
    }
  }

  @PostMapping
  public ResponseEntity<?> addNewUser(@RequestBody UserRequest ureq, Authentication auth) {
    try {
      return ResponseEntity.ok(userService.addUser(ureq, auth));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error adding new user: " + e.getMessage());
    }
  }
}
