package com.todo.todoserver.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.mapper.ToDoMapper;
import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.User;
import com.todo.todoserver.repository.ToDoRepository;

import io.micrometer.common.lang.Nullable;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ToDoServiceImpl implements ToDoService {

    private final ToDoRepository toDoRepository;
    private final UserService userService;
    private final AuthorizationService authorizationService;

    public Page<ToDo> getTodos(Authentication auth, @Nullable String show, @Nullable String sort,
            @Nullable String search, int page, int size) {
        String id = authorizationService.getUserIdFromAuth(auth);
        Sort.Direction sortDirection = Sort.Direction.ASC;

        if ("desc".equalsIgnoreCase(sort)) {
            sortDirection = Sort.Direction.DESC;
        }

        Sort sortOrder = Sort.by(sortDirection, "deadline");

        Boolean status = null;
        if ("finished".equalsIgnoreCase(show)) {
            status = true;
        } else if ("unfinished".equalsIgnoreCase(show)) {
            status = false;
        }

        Pageable pageable = PageRequest.of(page, size, sortOrder);

        return toDoRepository.findTodos(id, status, search, pageable);
    }

    public ToDoResponse updateToDo(ToDoRequest oldTodoRequest, Long id, Authentication auth) {
        String authId = authorizationService.getUserIdFromAuth(auth);
        ToDo newTodo = authorizationService.verifyToDoOwnership(id, authId);

        newTodo.setTitle(oldTodoRequest.getTitle());
        newTodo.setText(oldTodoRequest.getText());
        newTodo.setStatus(oldTodoRequest.getStatus());
        newTodo.setDeadline(oldTodoRequest.getDeadline());

        return ToDoMapper.toResponse(toDoRepository.save(newTodo));
    }

    public ToDoResponse createToDo(ToDoRequest toDoRequest, Authentication auth) {
        User author = userService.getUser(auth);

        var todo = ToDo.builder()
                .title(toDoRequest.getTitle())
                .text(toDoRequest.getText())
                .status(false)
                .author(author)
                .deadline(toDoRequest.getDeadline())
                .status(toDoRequest.getStatus())
                .build();

        return ToDoMapper.toResponse(toDoRepository.save(todo));
    }

    public void deleteToDo(Long id, Authentication auth) {
        String authId = authorizationService.getUserIdFromAuth(auth);
        ToDo todo = authorizationService.verifyToDoOwnership(id, authId);

        toDoRepository.delete(todo);
    }
}
