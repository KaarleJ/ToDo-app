package com.todo.todoserver.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtExtractorTest {

  @Mock
  private Authentication authentication;

  @Mock
  private Jwt jwt;

  private JwtExtractor jwtExtractor;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    jwtExtractor = new JwtExtractor();
  }

  @Test
  void getIdFromToken_ShouldReturnUserIdWhenValidJwtProvided() {
    when(authentication.getPrincipal()).thenReturn(jwt);
    when(jwt.getSubject()).thenReturn("auth0|mock-user-id");

    String userId = jwtExtractor.getIdFromToken(authentication);

    assertNotNull(userId);
    assertEquals("mock-user-id", userId);
  }

  @Test
  void getIdFromToken_ShouldThrowUnauthorizedWhenAuthenticationIsNull() {
    ResponseStatusException exception = assertThrows(ResponseStatusException.class,
        () -> jwtExtractor.getIdFromToken(null));

    assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
    assertEquals("Unauthorized", exception.getReason());
  }

  @Test
  void getIdFromToken_ShouldHandleInvalidSubjectFormat() {
    when(authentication.getPrincipal()).thenReturn(jwt);
    when(jwt.getSubject()).thenReturn("invalid-subject-format");

    String userId = jwtExtractor.getIdFromToken(authentication);

    assertNotNull(userId);
    assertEquals("invalid-subject-format", userId); // Returns entire subject if splitting fails
  }
}
