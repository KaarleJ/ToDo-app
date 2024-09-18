import { apiUrl } from "./lib/utils";
import { Todo } from "./types";
import apiClient from "./lib/apiClient";
import { defer } from "react-router-dom";


async function getTodos() {
  const todosResponse = await apiClient.get<Todo[]>(`${apiUrl}/api/todos`);
  return todosResponse.data
}

export const todosLoader = async () => {
  return defer({ todos: getTodos() });
};
