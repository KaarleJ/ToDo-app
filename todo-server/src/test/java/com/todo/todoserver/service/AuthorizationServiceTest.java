package com.todo.todoserver.service;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.User;
import com.todo.todoserver.repository.ToDoRepository;
import com.todo.todoserver.utils.TestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthorizationServiceTest {

  @Mock
  private ToDoRepository toDoRepository;

  @Mock
  private JwtExtractor jwtExtractor;

  @Mock
  private SecurityContext securityContext;

  @Mock
  private Authentication authentication;

  @InjectMocks
  private AuthorizationServiceImpl authorizationService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
  }

  @Test
  void getUserId_ShouldReturnUserIdFromToken() {
    String mockUserId = "mock-user-id";

    when(jwtExtractor.getIdFromToken(authentication)).thenReturn(mockUserId);

    String userId = authorizationService.getUserId();

    assertNotNull(userId);
    assertEquals(mockUserId, userId);
    verify(jwtExtractor, times(1)).getIdFromToken(authentication);
  }

  @Test
  void verifyToDoOwnership_ShouldReturnToDoWhenUserIsOwner() {
    ToDo mockToDo = spy(TestHelper.createToDo());
    String mockUserId = "mock-user-id";
    User mockUser = TestHelper.createUser();
    mockUser.setAuthId(mockUserId);

    when(jwtExtractor.getIdFromToken(authentication)).thenReturn(mockUserId);
    when(toDoRepository.findById(mockToDo.getId())).thenReturn(Optional.of(mockToDo));
    doReturn(mockUser).when(mockToDo).getAuthor();

    ToDo result = authorizationService.verifyToDoOwnership(mockToDo.getId());

    assertNotNull(result);
    assertEquals(mockToDo.getId(), result.getId());
    verify(toDoRepository, times(1)).findById(mockToDo.getId());
  }

  @Test
  void verifyToDoOwnership_ShouldThrowNotFoundWhenToDoDoesNotExist() {
    when(toDoRepository.findById(anyLong())).thenReturn(Optional.empty());

    ResponseStatusException exception = assertThrows(ResponseStatusException.class,
        () -> authorizationService.verifyToDoOwnership(1L));

    assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
    assertEquals("ToDo not found", exception.getReason());
    verify(toDoRepository, times(1)).findById(1L);
  }

  @Test
  void verifyToDoOwnership_ShouldThrowForbiddenWhenUserIsNotOwner() {
    ToDo mockToDo = spy(TestHelper.createToDo());
    String mockUserId = "mock-user-id";
    User mockUser = TestHelper.createUser();
    mockUser.setAuthId("different-user-id");

    when(jwtExtractor.getIdFromToken(authentication)).thenReturn(mockUserId);
    when(toDoRepository.findById(mockToDo.getId())).thenReturn(Optional.of(mockToDo));
    doReturn(mockUser).when(mockToDo).getAuthor();

    ResponseStatusException exception = assertThrows(ResponseStatusException.class,
        () -> authorizationService.verifyToDoOwnership(mockToDo.getId()));

    assertEquals(HttpStatus.FORBIDDEN, exception.getStatusCode());
    assertEquals("You are not the author of this ToDo", exception.getReason());
    verify(toDoRepository, times(1)).findById(mockToDo.getId());
  }
}
