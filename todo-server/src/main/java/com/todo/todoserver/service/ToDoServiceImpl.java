package com.todo.todoserver.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.User;
import com.todo.todoserver.model.request.ToDoRequest;
import com.todo.todoserver.repository.ToDoRepository;

import io.micrometer.common.lang.Nullable;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ToDoServiceImpl implements IToDoService {

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

    public ToDo updateToDo(ToDo oldTodo, Authentication auth) {
        String authId = authorizationService.getUserIdFromAuth(auth);
        ToDo newTodo = authorizationService.verifyToDoOwnership(oldTodo.getId(), authId);

        newTodo.setTitle(oldTodo.getTitle());
        newTodo.setText(oldTodo.getText());
        newTodo.setStatus(oldTodo.getStatus());
        newTodo.setDeadline(oldTodo.getDeadline());

        return toDoRepository.save(newTodo);
    }

    public ToDo addNewToDo(ToDoRequest treq, Authentication auth) {
        User author = userService.getUser(auth);
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
        String authId = authorizationService.getUserIdFromAuth(auth);
        ToDo todo = authorizationService.verifyToDoOwnership(id, authId);

        toDoRepository.delete(todo);
    }
}
