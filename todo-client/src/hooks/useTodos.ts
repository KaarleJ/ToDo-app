import useAuth from "./useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../types";

const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchTodos = async () => {
      const response = await axios.get("http://localhost:4000/todos", {
        params: {
          authorId: user.id,
        },
      });
      const todos = response.data;
      setTodos(todos);
    };
    fetchTodos();
  }, [user]);

  const postTodo = async (title: string, text: string) => {
    const response = await axios.post("http://localhost:4000/todos", {
      title,
      text,
      authorId: user?.id,
    });
    const todo = response.data;
    setTodos([...todos, todo]);
  }

  return { user, todos, postTodo };
};

export default useTodos;
