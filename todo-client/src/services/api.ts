import axios from "axios";
import { Todo } from "../types";

export const postTodoApi = async (
  title: string,
  text: string,
  deadLine: string | undefined
) => {
  const response = await axios.post<Todo>(
    "/api/todos",
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
    "/api/todos",
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
  await axios.delete<Todo>(`/api/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};
