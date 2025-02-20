package com.todo.todoserver.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ToDoRequest {
  private String title;
  private String text;
  private LocalDate deadline;
  private Boolean status;
}
