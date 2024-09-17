package com.todo.todoserver.service;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.User;
import com.todo.todoserver.model.request.ToDoRequest;
import com.todo.todoserver.repository.ToDoRepository;
import com.todo.todoserver.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ToDoService {

    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public Optional<List<ToDo>> getTodos(Authentication auth) {
        String id = jwtService.getIdFromToken(auth);
        Sort sort = Sort.by(Sort.Direction.ASC, "deadline");
        return toDoRepository.findByAuthorAuthId(id, sort);
    }

    public ToDo updateToDo(ToDo oldTodo, Authentication auth) {
        String id = jwtService.getIdFromToken(auth);
        Optional<ToDo> optionalToDo = toDoRepository.findById(oldTodo.getId());

        if (optionalToDo.isPresent()) {
            ToDo newTodo = optionalToDo.get();

            if (!newTodo.getAuthor().getAuthId().equals(id)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not the author of this todo");
            }

            newTodo.setTitle(oldTodo.getTitle());
            newTodo.setText(oldTodo.getText());
            newTodo.setStatus(oldTodo.getStatus());
            newTodo.setDeadline(oldTodo.getDeadline());

            toDoRepository.save(newTodo);

            return newTodo;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ToDo not found");
        }
    }

    public ToDo addNewToDo(ToDoRequest treq, Authentication auth) {
        String id = jwtService.getIdFromToken(auth);
        User author = userRepository.findByAuthId(id).orElseThrow();
        var todo = ToDo.builder()
                .title(treq.getTitle())
                .text(treq.getText())
                .status(false)
                .author(author)
                .deadline(treq.getDeadline())
                .status(treq.getStatus())
                .build();
        return toDoRepository.save(todo);
    }

    public void deleteToDo(Long id, Authentication auth) {
        String authId = jwtService.getIdFromToken(auth);
        Optional<ToDo> optionalToDo = toDoRepository.findById(id);
        if (optionalToDo.isPresent()) {
            ToDo toDo = optionalToDo.get();
            if (!toDo.getAuthor().getAuthId().equals(authId)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not the author of this todo");
            }
            toDoRepository.delete(toDo);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ToDo not found");
        }
    }
}
