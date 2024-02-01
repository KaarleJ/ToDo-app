package com.todo.todoserver.ToDo;

import java.time.LocalDate;
import java.util.Date;

public class ToDo {
    private Long id;
    private String title;
    private String text;
    private  Boolean completed;
    private LocalDate deadLine;

    public ToDo() {
    }

    public ToDo(Long id, String title, String text, Boolean completed, LocalDate deadLine) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.completed = completed;
        this.deadLine = deadLine;
    }

    public ToDo(String title, String text, Boolean completed, LocalDate deadLine) {
        this.title = title;
        this.text = text;
        this.completed = completed;
        this.deadLine = deadLine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public LocalDate getDeadLine() {
        return deadLine;
    }

    public void setDeadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    @Override
    public String toString() {
        return "ToDo{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", completed=" + completed +
                ", deadLine=" + deadLine +
                '}';
    }
}
