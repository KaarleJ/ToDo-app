import { Todo } from "../types";
import TodoCard from "./TodoCard";

const TodoTable = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="flex flex-col justify-start items-center">
      {todos.map((todo) => (
        <TodoCard todo={todo} key={todo.id}/>
      ))}
    </div>
  );
};

export default TodoTable;
