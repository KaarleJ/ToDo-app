import { Todo } from "../types";
import TodoCard from "./TodoCard";
import Modal from "./Modal";
import { useState } from "react";
import ViewTodo from "./ViewTodo";

const TodoTable = ({ todos }: { todos: Todo[] }) => {
  const [targetTodo, setTargetTodo] = useState<Todo>();

  return (
    <div className="flex flex-col justify-start items-center">
      {todos.map((todo) => (
        <TodoCard
          todo={todo}
          key={todo.id}
          onClick={() => setTargetTodo(todo)}
        />
      ))}
      <Modal
        onClose={() => setTargetTodo(undefined)}
        show={targetTodo !== undefined}
        className="!bg-purple-900"
      >
        {targetTodo && <ViewTodo todo={targetTodo}/>}
      </Modal>
    </div>
  );
};

export default TodoTable;
