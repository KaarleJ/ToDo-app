package com.todo.todoserver.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserModelTest {

  @Test
  void testUserBuilder_ShouldCreateUserObject() {
    User user = User.builder()
        .id(1L)
        .authId("auth123")
        .username("testuser")
        .email("testuser@example.com")
        .profilePicture("http://example.com/profile.jpg")
        .build();

    assertNotNull(user);
    assertEquals(1L, user.getId());
    assertEquals("auth123", user.getAuthId());
    assertEquals("testuser", user.getUsername());
    assertEquals("testuser@example.com", user.getEmail());
    assertEquals("http://example.com/profile.jpg", user.getProfilePicture());
  }

  @Test
  void testUserConstructors_ShouldInitializeCorrectly() {
    User user = new User("testuser", "testuser@example.com", "http://example.com/profile.jpg", "auth123");

    assertNotNull(user);
    assertNull(user.getId()); // ID should be null for non-persisted objects
    assertEquals("auth123", user.getAuthId());
    assertEquals("testuser", user.getUsername());
    assertEquals("testuser@example.com", user.getEmail());
    assertEquals("http://example.com/profile.jpg", user.getProfilePicture());
  }

  @Test
  void testUserSettersAndGetters_ShouldWorkCorrectly() {
    User user = new User();
    user.setId(1L);
    user.setAuthId("auth123");
    user.setUsername("updateduser");
    user.setEmail("updateduser@example.com");
    user.setProfilePicture("http://example.com/updatedprofile.jpg");

    assertEquals(1L, user.getId());
    assertEquals("auth123", user.getAuthId());
    assertEquals("updateduser", user.getUsername());
    assertEquals("updateduser@example.com", user.getEmail());
    assertEquals("http://example.com/updatedprofile.jpg", user.getProfilePicture());
  }
}
