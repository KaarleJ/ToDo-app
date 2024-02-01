import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../types";

const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  console.log(user);

  useEffect(() => {
    console.log("useEffect");
    if (!user) {
      setTodos([]);
      return;
    }
    const fetchTodos = async () => {
      const response = await axios.get<Todo[]>("http://localhost:4000/todos", {
        params: {
          authorId: user.id,
        },
      });
      const todos = response.data;
      setTodos(todos);
    };
    fetchTodos();
  }, [user]);

  const postTodo = async (
    title: string,
    text: string,
    deadLine: string
  ) => {

    let date: string | undefined;
    if (deadLine.length === 0) {
      date = undefined;
    } else {
      date = deadLine;
    }

    const response = await axios.post<Todo>("http://localhost:4000/todos", {
      title,
      text,
      deadLine: date,
      completed: false,
      authorId: user?.id,
    });
    const todo = response.data;
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
    const response = await axios.put<Todo>(
      `http://localhost:4000/todos/${id}`,
      {
        title,
        text,
        completed,
        deadLine: date,
        authorId: user?.id,
      }
    );
    const todo = response.data;
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
    await axios.delete<Todo>(`http://localhost:4000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, postTodo, putTodo, deleteTodo };
};

export default useTodos;
