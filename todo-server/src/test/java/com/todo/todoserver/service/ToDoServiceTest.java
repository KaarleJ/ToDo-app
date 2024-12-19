package com.todo.todoserver.service;

import com.todo.todoserver.dto.ToDoQueryParameters;
import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.User;
import com.todo.todoserver.repository.ToDoRepository;
import com.todo.todoserver.utils.TestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class ToDoServiceTest {

  @Mock
  private ToDoRepository toDoRepository;

  @Mock
  private AuthorizationService authorizationService;

  @Mock
  private UserService userService;

  @InjectMocks
  private ToDoServiceImpl toDoService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void getTodos_ShouldReturnPaginatedTodos() {
    ToDo mockToDo = TestHelper.createToDo();
    Page<ToDo> toDoPage = new PageImpl<>(Collections.singletonList(mockToDo));
    ToDoQueryParameters queryParameters = ToDoQueryParameters.builder().page(1).size(10).build();

    when(authorizationService.getUserId()).thenReturn("authId");
    when(toDoRepository.findTodos(eq("authId"), any(), any(), any(Pageable.class))).thenReturn(toDoPage);

    Page<ToDoResponse> retrievedTodos = toDoService.getTodos(queryParameters);

    assertNotNull(retrievedTodos);
    assertEquals(1, retrievedTodos.getTotalElements());
    assertEquals(mockToDo.getId(), retrievedTodos.getContent().get(0).getId());
    verify(toDoRepository, times(1)).findTodos(eq("authId"), any(), any(), any(Pageable.class));
  }

  @Test
  void createToDo_ShouldSaveAndReturnToDo() {
    ToDoRequest toDoRequest = TestHelper.createToDoRequest();
    ToDo mockToDo = TestHelper.createToDo();
    User mockUser = TestHelper.createUser();

    when(userService.getUser()).thenReturn(mockUser);
    when(toDoRepository.save(any(ToDo.class))).thenReturn(mockToDo);

    ToDoResponse createdToDo = toDoService.createToDo(toDoRequest);

    assertNotNull(createdToDo);
    assertEquals(mockToDo.getId(), createdToDo.getId());
    assertEquals(mockToDo.getTitle(), createdToDo.getTitle());
    verify(userService, times(1)).getUser();
    verify(toDoRepository, times(1)).save(any(ToDo.class));
  }

  @Test
  void updateToDo_ShouldUpdateAndReturnToDo() {
    ToDoRequest toDoRequest = TestHelper.createToDoRequest();
    ToDo existingToDo = TestHelper.createToDo();

    when(authorizationService.verifyToDoOwnership(existingToDo.getId())).thenReturn(existingToDo);
    when(toDoRepository.save(any(ToDo.class))).thenAnswer(invocation -> invocation.getArgument(0));

    ToDoResponse updatedToDo = toDoService.updateToDo(toDoRequest, existingToDo.getId());

    assertNotNull(updatedToDo);
    assertEquals(existingToDo.getId(), updatedToDo.getId());
    assertEquals(toDoRequest.getTitle(), updatedToDo.getTitle());
    verify(authorizationService, times(1)).verifyToDoOwnership(existingToDo.getId());
    verify(toDoRepository, times(1)).save(any(ToDo.class));
  }

  @Test
  void deleteToDo_ShouldRemoveToDo() {
    ToDo mockToDo = TestHelper.createToDo();

    doNothing().when(toDoRepository).delete(mockToDo);
    when(authorizationService.verifyToDoOwnership(mockToDo.getId())).thenReturn(mockToDo);

    toDoService.deleteToDo(mockToDo.getId());

    verify(toDoRepository, times(1)).delete(mockToDo);
  }
}
