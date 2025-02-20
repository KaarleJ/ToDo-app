package com.todo.todoserver.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.todo.todoserver.dto.ToDoQueryParameters;
import com.todo.todoserver.dto.ToDoRequest;
import com.todo.todoserver.dto.ToDoResponse;
import com.todo.todoserver.mapper.ToDoMapper;
import com.todo.todoserver.model.ToDo;
import com.todo.todoserver.model.User;
import com.todo.todoserver.repository.ToDoRepository;
import com.todo.todoserver.utils.ToDoQueryHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ToDoServiceImpl implements ToDoService {

    private final ToDoRepository toDoRepository;
    private final UserService userService;
    private final AuthorizationService authorizationService;

    public Page<ToDoResponse> getTodos(ToDoQueryParameters queryParameters) {
        String authId = authorizationService.getUserId();

        Sort sortOrder = ToDoQueryHelper.getSort(queryParameters.getSort());
        Boolean status = ToDoQueryHelper.getStatusFilter(queryParameters.getShow());
        Pageable pageable = PageRequest.of(queryParameters.getPage() - 1, queryParameters.getSize(), sortOrder);

        Page<ToDo> todos = toDoRepository.findTodos(authId, status, queryParameters.getSearch(), pageable);
        return todos.map(ToDoMapper::toResponse);
    }

    public ToDoResponse updateToDo(ToDoRequest oldTodoRequest, Long id) {
        ToDo newTodo = authorizationService.verifyToDoOwnership(id);

        newTodo.setTitle(oldTodoRequest.getTitle());
        newTodo.setText(oldTodoRequest.getText());
        newTodo.setStatus(oldTodoRequest.getStatus());
        newTodo.setDeadline(oldTodoRequest.getDeadline());

        return ToDoMapper.toResponse(toDoRepository.save(newTodo));
    }

    public ToDoResponse createToDo(ToDoRequest toDoRequest) {
        User author = userService.getUser();

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

    public void deleteToDo(Long id) {
        ToDo todo = authorizationService.verifyToDoOwnership(id);

        toDoRepository.delete(todo);
    }
}
