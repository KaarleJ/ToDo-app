package com.todo.todoserver.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ToDoModelTest {

  @Test
  void testToDoBuilder_ShouldCreateToDoObject() {
    User author = new User();
    author.setId(1L);
    author.setUsername("testuser");

    ToDo todo = ToDo.builder()
        .id(1L)
        .title("Test Title")
        .text("Test Text")
        .status(false)
        .deadline(LocalDate.of(2024, 1, 1))
        .author(author)
        .build();

    assertNotNull(todo);
    assertEquals(1L, todo.getId());
    assertEquals("Test Title", todo.getTitle());
    assertEquals("Test Text", todo.getText());
    assertFalse(todo.getStatus());
    assertEquals(LocalDate.of(2024, 1, 1), todo.getDeadline());
    assertEquals(author, todo.getAuthor());
  }

  @Test
  void testToDoConstructors_ShouldInitializeCorrectly() {
    User author = new User();
    author.setId(1L);
    author.setUsername("testuser");

    ToDo todo = new ToDo("Test Title", "Test Text", false, LocalDate.of(2024, 1, 1), author);

    assertNotNull(todo);
    assertNull(todo.getId()); // ID should be null for non-persisted objects
    assertEquals("Test Title", todo.getTitle());
    assertEquals("Test Text", todo.getText());
    assertFalse(todo.getStatus());
    assertEquals(LocalDate.of(2024, 1, 1), todo.getDeadline());
    assertEquals(author, todo.getAuthor());
  }

  @Test
  void testToDoSettersAndGetters_ShouldWorkCorrectly() {
    User author = new User();
    author.setId(1L);
    author.setUsername("testuser");

    ToDo todo = new ToDo();
    todo.setId(1L);
    todo.setTitle("Updated Title");
    todo.setText("Updated Text");
    todo.setStatus(true);
    todo.setDeadline(LocalDate.of(2025, 12, 31));
    todo.setAuthor(author);

    assertEquals(1L, todo.getId());
    assertEquals("Updated Title", todo.getTitle());
    assertEquals("Updated Text", todo.getText());
    assertTrue(todo.getStatus());
    assertEquals(LocalDate.of(2025, 12, 31), todo.getDeadline());
    assertEquals(author, todo.getAuthor());
  }
}
