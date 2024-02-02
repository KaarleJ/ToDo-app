package com.todo.todoserver.ToDo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class ToDoConfig {
    @Bean
    CommandLineRunner commandLineRunner(ToDoRepository repository) {
        return args -> {
            ToDo test = new ToDo(
                    "TestTodo",
                    "This todo is just for testing",
                    false,
                    LocalDate.of(2024, Month.FEBRUARY, 24)

            );

            ToDo test2 = new ToDo(
                    "TestTodo2",
                    "This todo is also just for testing",
                    false,
                    LocalDate.of(2024, Month.FEBRUARY, 24)

            );

            repository.saveAll(
                    List.of(test, test2)
            );
        };
    }
}
