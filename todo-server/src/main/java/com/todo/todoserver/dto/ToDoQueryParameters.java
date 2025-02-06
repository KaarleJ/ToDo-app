package com.todo.todoserver.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ToDoQueryParameters {

  private String show;
  private String sort;
  private String search;
  private int page = 1;
  private int size = 10;

  @JsonCreator
  public ToDoQueryParameters(
      @JsonProperty("show") String show,
      @JsonProperty("sort") String sort,
      @JsonProperty("search") String search,
      @JsonProperty("page") Integer page,
      @JsonProperty("size") Integer size) {
    this.show = show;
    this.sort = sort;
    this.search = search;
    this.page = (page == null) ? 1 : page;
    this.size = (size == null) ? 10 : size;
  }
}
