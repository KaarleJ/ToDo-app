import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import { Todo } from "../types";
import { postTodoApi, putTodoApi, deleteTodoApi, fetchTodosApi } from "../services/api";

const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }
    const fetchTodos = async () => {
      const todos = await fetchTodosApi();
      setTodos(todos);
    };
    fetchTodos();
  }, [user]);

  const postTodo = async (title: string, text: string, deadLine: string) => {
    let date: string | undefined;
    if (deadLine.length === 0) {
      date = undefined;
    } else {
      date = deadLine;
    }

    const todo = await postTodoApi(title, text, date);

    setTodos([...todos, todo]);
  };

  const putTodo = async (
    id: number,
    title: string,
    text: string,
    completed: boolean,
    deadLine: string
  ) => {
    let date: string | undefined;
    if (deadLine.length === 0) {
      date = undefined;
    } else {
      date = deadLine;
    }
    const todo = await putTodoApi(id, title, text, completed, date);
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          return todo;
        }
        return t;
      })
    );
  };

  const deleteTodo = async (id: number) => {
    await deleteTodoApi(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, postTodo, putTodo, deleteTodo };
};

export default useTodos;
