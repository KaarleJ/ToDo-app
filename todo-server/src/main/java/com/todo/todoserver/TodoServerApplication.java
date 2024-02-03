package com.todo.todoserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoServerApplication {

	public static void main(String[] args) {
		System.out.println(System.getenv("SECRET_KEY"));
		SpringApplication.run(TodoServerApplication.class, args);
	}


}
