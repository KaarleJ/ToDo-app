package com.todo.todoserver.User;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

  @Bean
  CommandLineRunner cmdLineRunner(UserRepository repository) {
    return args -> {
      User test = new User(
          "test",
          "test");
      repository.save(test);
    };
  }
}