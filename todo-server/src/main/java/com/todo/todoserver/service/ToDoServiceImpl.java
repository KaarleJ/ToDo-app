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

import io.micrometer.common.lang.Nullable;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ToDoServiceImpl implements ToDoService {

    private final ToDoRepository toDoRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public Optional<List<ToDo>> getTodos(Authentication auth, @Nullable String show, @Nullable String sort,
            @Nullable String search) {
        String id = jwtService.getIdFromToken(auth);
        Sort.Direction sortDirection = Sort.Direction.ASC; // Default to ASC

        if ("desc".equalsIgnoreCase(sort)) {
            sortDirection = Sort.Direction.DESC;
        }

        Sort sortOrder = Sort.by(sortDirection, "deadline"); // Sort by "deadline" field

        Boolean status = null;
        if ("finished".equalsIgnoreCase(show)) {
            status = true;
        } else if ("unfinished".equalsIgnoreCase(show)) {
            status = false;
        }

        return toDoRepository.findTodos(id, status, search, sortOrder);
    }

    public ToDo updateToDo(ToDo oldTodo, Authentication auth) {
        String id = jwtService.getIdFromToken(auth);
        ToDo newTodo = toDoRepository.findById(oldTodo.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        if (!newTodo.getAuthor().getAuthId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not the author of this todo");
        }

        newTodo.setTitle(oldTodo.getTitle());
        newTodo.setText(oldTodo.getText());
        newTodo.setStatus(oldTodo.getStatus());
        newTodo.setDeadline(oldTodo.getDeadline());

        toDoRepository.save(newTodo);

        return newTodo;
    }

    public ToDo addNewToDo(ToDoRequest treq, Authentication auth) {
        String id = jwtService.getIdFromToken(auth);
        User author = userRepository.findByAuthId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
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
        ToDo todo = toDoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ToDo not found"));

        if (!todo.getAuthor().getAuthId().equals(authId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not the author of this todo");
        }

        toDoRepository.delete(todo);
    }
}
