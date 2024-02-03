import axios from "axios";
import { Todo } from "../types";

export const postTodoApi = async (
  title: string,
  text: string,
  deadLine: string | undefined
) => {
  const response = await axios.post<Todo>(
    "http://localhost:8080/api/todos",
    {
      title,
      text,
      deadLine,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const putTodoApi = async (
  id: number,
  title: string,
  text: string,
  completed: boolean,
  deadLine: string | undefined
) => {
  const response = await axios.put<Todo>(
    "http://localhost:8080/api/todos",
    {
      id,
      title,
      text,
      completed,
      deadLine,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteTodoApi = async (id: number) => {
  await axios.delete<Todo>(`http://localhost:8080/api/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};
