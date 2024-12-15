package com.todo.todoserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder.Default;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ToDoQueryParameters {

  private String show;
  private String sort;
  private String search;

  @Default
  private int page = 1;

  @Default
  private int size = 10;
}
