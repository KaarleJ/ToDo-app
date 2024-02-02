package com.todo.todoserver.ToDo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    @Autowired
    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public List<ToDo> getTodos() {
        return toDoRepository.findAll();
    }

    public ToDo updateToDo(ToDo toDo) {
        Optional<ToDo> optionalToDo = toDoRepository.findById(toDo.getId());

        if (optionalToDo.isPresent()) {
            ToDo toDo1 = optionalToDo.get();

            toDo1.setTitle(toDo.getTitle());
            toDo1.setText(toDo.getText());
            toDo1.setCompleted(toDo.getCompleted());
            toDo1.setDeadLine(toDo.getDeadLine());

            toDoRepository.save(toDo1);

            return toDo1;
        }

        return null;
    }
}
