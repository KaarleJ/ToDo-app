import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import { Todo } from "../types";
import {
  postTodoApi,
  putTodoApi,
  deleteTodoApi,
  fetchTodosApi,
} from "../services/api";

const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }
    const fetchTodos = async () => {
      const todos = await fetchTodosApi();
      setTodos(todos);
    };
    fetchTodos();
    setLoading(false);
  }, [user]);

  const postTodo = async (title: string, text: string, deadLine: string) => {
    setLoading(true);
    let date: string | undefined;
    if (deadLine.length === 0) {
      date = undefined;
    } else {
      date = deadLine;
    }

    try {
      const todo = await postTodoApi(title, text, date);
      setTodos([...todos, todo]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        console.log(error.message);
      }
    }
    setLoading(false);
  };

  const putTodo = async (
    id: number,
    title: string,
    text: string,
    completed: boolean,
    deadLine: string
  ) => {
    setLoading(true);
    let date: string | undefined;
    if (deadLine.length === 0) {
      date = undefined;
    } else {
      date = deadLine;
    }

    try {
      const todo = await putTodoApi(id, title, text, completed, date);
      setTodos(
        todos.map((t) => {
          if (t.id === id) {
            return todo;
          }
          return t;
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        console.log(error.message);
      }
    }

    setLoading(false);
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    try {
      await deleteTodoApi(id);
    setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        console.log(error.message);
      }
    }
    setLoading(false);
  };

  return { todos, loading, postTodo, putTodo, deleteTodo };
};

export default useTodos;
