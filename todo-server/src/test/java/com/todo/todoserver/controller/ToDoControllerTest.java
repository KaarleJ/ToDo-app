package com.todo.todoserver.controller;

import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.dto.ToDoQueryParameters;
import com.todo.todoserver.service.ToDoService;
import com.todo.todoserver.utils.TestHelper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@WebMvcTest(ToDoController.class)
class ToDoControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private ToDoService toDoService;

  @Test
  @WithMockUser(username = "user")
  void getAllTodos_ShouldReturnTodoList() throws Exception {
    ToDoResponse todo1 = TestHelper.createToDoResponse();
    ToDoResponse todo2 = TestHelper.createToDoResponse();
    ToDoQueryParameters queryParameters = new ToDoQueryParameters();

    Page<ToDoResponse> todoPage = new PageImpl<>(Arrays.asList(todo1, todo2));

    when(toDoService.getTodos(queryParameters)).thenReturn(todoPage);

    mockMvc.perform(get("/api/todos"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].id").value(todo1.getId()))
        .andExpect(jsonPath("$.content[0].title").value(todo1.getTitle()))
        .andExpect(jsonPath("$.content[1].id").value(todo2.getId()))
        .andExpect(jsonPath("$.content[1].title").value(todo2.getTitle()));
  }

  @Test
  void createTodo_ShouldReturnCreatedTodo() throws Exception {
    ToDoRequest toDoRequest = TestHelper.createToDoRequest();
    ToDoResponse toDoResponse = TestHelper.createToDoResponse();

    when(toDoService.createToDo(any(ToDoRequest.class))).thenReturn(toDoResponse);

    mockMvc.perform(post("/api/todos")
        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_access:todos")))
        .contentType(MediaType.APPLICATION_JSON)
        .content(String.format("{\"title\":\"%s\",\"description\":\"%s\",\"completed\":%b}",
            toDoRequest.getTitle(), toDoRequest.getText(), toDoRequest.getStatus())))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(toDoResponse.getId()))
        .andExpect(jsonPath("$.title").value(toDoResponse.getTitle()));
  }

  @Test
  void updateTodo_ShouldReturnUpdatedTodo() throws Exception {
    ToDoRequest toDoRequest = TestHelper.createToDoRequest();
    ToDoResponse toDoResponse = TestHelper.createToDoResponse();

    when(toDoService.updateToDo(any(ToDoRequest.class), Mockito.eq(1L))).thenReturn(toDoResponse);

    mockMvc.perform(put("/api/todos/1")
        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_access:todos")))
        .contentType(MediaType.APPLICATION_JSON)
        .content(String.format("{\"title\":\"%s\",\"description\":\"%s\",\"completed\":%b}",
            toDoRequest.getTitle(), toDoRequest.getText(), toDoRequest.getStatus())))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(toDoResponse.getId()))
        .andExpect(jsonPath("$.title").value(toDoResponse.getTitle()));
  }

  @Test
  void deleteTodo_ShouldReturnNoContent() throws Exception {
    Mockito.doNothing().when(toDoService).deleteToDo(1L);

    mockMvc.perform(delete("/api/todos/1")
        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_access:todos"))))
        .andExpect(status().isOk());
  }
}
