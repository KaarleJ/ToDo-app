package com.todo.todoserver.service;

import com.todo.todoserver.dto.UserRequest;
import com.todo.todoserver.model.User;
import com.todo.todoserver.repository.UserRepository;
import com.todo.todoserver.utils.TestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private AuthorizationService authorizationService;

  @InjectMocks
  private UserServiceImpl userService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void getUser_ShouldReturnUser() {
    User mockUser = TestHelper.createUser();

    when(authorizationService.getUserId()).thenReturn(mockUser.getId().toString());
    when(userRepository.findByAuthId(mockUser.getId().toString())).thenReturn(java.util.Optional.of(mockUser));

    User retrievedUser = userService.getUser();

    assertNotNull(retrievedUser);
    assertEquals(mockUser.getId(), retrievedUser.getId());
    assertEquals(mockUser.getUsername(), retrievedUser.getUsername());
    assertEquals(mockUser.getEmail(), retrievedUser.getEmail());
    verify(userRepository, times(1)).findByAuthId(mockUser.getId().toString());
  }

  @Test
  void addUser_ShouldSaveAndReturnUser() {
    UserRequest userRequest = TestHelper.createUserRequest();
    User mockUser = TestHelper.createUser();

    when(userRepository.save(any(User.class))).thenReturn(mockUser);

    User createdUser = userService.addUser(userRequest);

    assertNotNull(createdUser);
    assertEquals(mockUser.getId(), createdUser.getId());
    assertEquals(mockUser.getUsername(), createdUser.getUsername());
    assertEquals(mockUser.getEmail(), createdUser.getEmail());
    verify(userRepository, times(1)).save(any(User.class));
  }
}
