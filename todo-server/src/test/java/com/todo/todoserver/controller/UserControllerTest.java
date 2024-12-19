package com.todo.todoserver.controller;

import com.todo.todoserver.dto.UserRequest;
import com.todo.todoserver.model.User;
import com.todo.todoserver.service.UserService;
import com.todo.todoserver.utils.TestHelper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@WebMvcTest(UserController.class)
class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  @Test
  @WithMockUser(username = "user")
  void getUser_ShouldReturnUser() throws Exception {
    User user = TestHelper.createUser();

    when(userService.getUser()).thenReturn(user);

    mockMvc.perform(get("/api/user"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(user.getId()))
        .andExpect(jsonPath("$.username").value(user.getUsername()))
        .andExpect(jsonPath("$.email").value(user.getEmail()));
  }

  @Test
  @WithMockUser(username = "user")
  void addNewUser_ShouldReturnCreatedUser() throws Exception {
    User user = TestHelper.createUser();
    UserRequest userRequest = TestHelper.createUserRequest();

    when(userService.addUser(any(UserRequest.class))).thenReturn(user);

    mockMvc.perform(post("/api/user")
        .with(jwt())
        .contentType(MediaType.APPLICATION_JSON)
        .content(String.format("{\"name\":\"%s\",\"email\":\"%s\"}",
            userRequest.getUsername(), userRequest.getEmail())))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(user.getId()))
        .andExpect(jsonPath("$.username").value(user.getUsername()))
        .andExpect(jsonPath("$.email").value(user.getEmail()));
  }
}
