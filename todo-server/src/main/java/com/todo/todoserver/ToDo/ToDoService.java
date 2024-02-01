package com.todo.todoserver.ToDo;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

public class ToDoService {

    public List<ToDo> getTodos() {
        return List.of(
                new ToDo(
                        1L,
                        "TestTodo",
                        "This todo is just for testing",
                        false,
                        LocalDate.of(2024, Month.FEBRUARY, 24)

                )
        );
    }
}
