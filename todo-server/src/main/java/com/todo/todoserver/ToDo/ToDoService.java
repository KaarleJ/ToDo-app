package com.todo.todoserver.ToDo;

import org.springframework.stereotype.Service;

import com.todo.todoserver.User.User;
import com.todo.todoserver.User.UserRepository;
import com.todo.todoserver.config.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ToDoService {

    private final ToDoRepository toDoRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public Optional<List<ToDo>> getTodos(HttpServletRequest req) {
        String jwt = req.getHeader("Authorization").substring(7);
        String username = jwtService.extractUsername(jwt);
        User user = userRepository.findByUsername(username).orElseThrow();

        return toDoRepository.findByAuthorId(user.getId());
    }

    public ToDo updateToDo(ToDo toDo, HttpServletRequest req) {
        String jwt = req.getHeader("Authorization").substring(7);
        String username = jwtService.extractUsername(jwt);
        User user = userRepository.findByUsername(username).orElseThrow();
        Optional<ToDo> optionalToDo = toDoRepository.findById(toDo.getId());

        if (optionalToDo.isPresent()) {
            ToDo toDo1 = optionalToDo.get();

            if (!toDo1.getAuthor().getId().equals(user.getId())) {
                throw new RuntimeException("You are not the author of this todo");
            }

            toDo1.setTitle(toDo.getTitle());
            toDo1.setText(toDo.getText());
            toDo1.setCompleted(toDo.getCompleted());
            toDo1.setDeadLine(toDo.getDeadLine());

            toDoRepository.save(toDo1);

            return toDo1;
        } else {
            throw new RuntimeException("ToDo not found");
        }
    }

    public ToDo addNewToDo(ToDoRequest treq, HttpServletRequest req) {
        String jwt = req.getHeader("Authorization").substring(7);
        String username = jwtService.extractUsername(jwt);
        User user = userRepository.findByUsername(username).orElseThrow();
        var todo = ToDo.builder()
                .title(treq.getTitle())
                .text(treq.getText())
                .completed(false)
                .author(user)
                .deadLine(treq.getDeadLine())
                .build();
        return toDoRepository.save(todo);
    }

    public void deleteToDo(Long id, HttpServletRequest req) {
        String jwt = req.getHeader("Authorization").substring(7);
        String username = jwtService.extractUsername(jwt);
        User user = userRepository.findByUsername(username).orElseThrow();
        Optional<ToDo> optionalToDo = toDoRepository.findById(id);

        if (optionalToDo.isPresent()) {
            ToDo toDo1 = optionalToDo.get();

            if (!toDo1.getAuthor().getId().equals(user.getId())) {
                throw new RuntimeException("You are not the author of this todo");
            }

            toDoRepository.delete(toDo1);
        } else {
            throw new RuntimeException("ToDo not found");
        }
    }
}


