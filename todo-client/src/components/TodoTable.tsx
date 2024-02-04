import { Todo } from "../types";
import TodoCard from "./TodoCard";
import Modal from "./Modal";
import { useState } from "react";
import useTodos from "../hooks/useTodos";
import ViewTodo from "./ViewTodo";
import { IoIosCreate as Create } from "react-icons/io";
import TodoForm from "./TodoForm";
import Loader from "./Loader";

const TodoTable = () => {
  const { todos, loading, postTodo, putTodo, deleteTodo } = useTodos();
  const [targetTodo, setTargetTodo] = useState<Todo>();
  const [showPostModal, setShowPostModal] = useState(false);

  const handlePostTodo = async ({
    title,
    text,
    deadLine,
  }: {
    title: string;
    text: string;
    deadLine: string;
  }) => {
    await postTodo(title, text, deadLine);
    setShowPostModal(false);
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <button
        className="flex flex-row justify-between items-center bg-purple-700 p-2 shadow-lg shadow-indigo-300 rounded-md self-end text-white text-xl"
        onClick={() => setShowPostModal(true)}
      >
        Create <Create className="w-6 h-6 mx-2 mb-1" />
      </button>

      {!targetTodo && loading && !showPostModal && <Loader size="64" />}

      {todos.length === 0 && (
        <h1 className="text-3xl font-bold text-purple-700">No todos yet 😢</h1>
      )}

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
        {targetTodo && (
          <ViewTodo
            onClose={() => setTargetTodo(undefined)}
            todo={targetTodo}
            putTodo={putTodo}
            deleteTodo={deleteTodo}
            loading={loading}
          />
        )}
      </Modal>

      <Modal
        onClose={() => setShowPostModal(false)}
        show={showPostModal}
        className="!bg-purple-900"
      >
        {loading ? (
          <Loader size="128" className="mx-20 my-24" />
        ) : (
          <TodoForm
            className="p-10"
            title="Create a new ToDo"
            initialValues={{
              title: "",
              text: "",
              deadLine: "",
              completed: false,
            }}
            onSubmit={handlePostTodo}
          />
        )}
      </Modal>
    </div>
  );
};

export default TodoTable;
