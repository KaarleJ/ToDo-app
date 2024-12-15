package com.todo.todoserver.utils;

import org.springframework.data.domain.Sort;

public class ToDoQueryHelper {

  public static Sort getSort(String sortDirection) {
    return Sort.by("desc".equalsIgnoreCase(sortDirection) ? Sort.Direction.DESC : Sort.Direction.ASC, "deadline");
  }

  public static Boolean getStatusFilter(String show) {
    if ("finished".equalsIgnoreCase(show)) {
      return true;
    } else if ("unfinished".equalsIgnoreCase(show)) {
      return false;
    }
    return null;
  }
}