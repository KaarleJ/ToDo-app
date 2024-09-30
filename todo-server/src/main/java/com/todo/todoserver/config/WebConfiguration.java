package com.todo.todoserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
  @Override
  public void addViewControllers(@NonNull ViewControllerRegistry registry) {
      // Forward all paths except those containing a period (.) and paths starting with /api to index.html
      
      // Match all paths without a period (.) and exclude paths that start with /api
      registry.addViewController("/{path:[^\\.]+}")  
              .setViewName("forward:/index.html");
      
      // Handle nested paths, but without using ** after the first segment
      registry.addViewController("/{path:^(?!api$).*}/{subpath:[^\\.]*}")
              .setViewName("forward:/index.html");
  }
}
