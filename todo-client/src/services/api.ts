import axios from "axios";
import { Todo } from "../types";
import { User } from "../types";

const baseUrl = process.env.BASE_URL || "http://localhost:8080";

export const postTodoApi = async (
  title: string,
  text: string,
  deadLine: string | undefined
) => {
  const response = await axios.post<Todo>(
    `${baseUrl}/api/todos`,
    {
      title,
      text,
      deadLine,
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
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
    `${baseUrl}/api/todos`,
    {
      id,
      title,
      text,
      completed,
      deadLine,
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteTodoApi = async (id: number) => {
  await axios.delete<Todo>(`${baseUrl}/api/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};

export const fetchTodosApi = async () => {
  const response = await axios.get<Todo[]>(`${baseUrl}/api/todos`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export const loginApi = async (username: string, password: string) => {
  const response = await axios.post<{ user: User, jwt: string }>(
    `${baseUrl}/api/auth/login`,
    {
      username,
      password,
    }
  );
  return response.data;
}

export const registerApi = async (username: string, password: string) => {
  const response = await axios.post<{ user: User, jwt: string }>(
    `${baseUrl}/api/auth/register`,
    {
      username,
      password,
    }
  );
  return response.data;
}