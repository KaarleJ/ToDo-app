import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../types";
import { postTodoApi, putTodoApi, deleteTodoApi } from "../services/api";

const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }
    const fetchTodos = async () => {
      const response = await axios.get<Todo[]>(
        "http://localhost:8080/api/todos",
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const todos = response.data;
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
