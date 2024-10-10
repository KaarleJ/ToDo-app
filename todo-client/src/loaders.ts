import { apiUrl } from "./lib/utils";
import { Todo } from "./types";
import { defer } from "react-router-dom";
import apiClient from "./lib/apiClient";

async function getTodos(request: Request) {
  const url = new URL(request.url);
  const todosResponse = await apiClient.get<Todo[]>(`${apiUrl}/api/todos`, {
    params: url.searchParams,
  });
  return todosResponse.data;
}

export const todosLoader = async (
  request: Request,
  isAuthenticated: boolean,
) => {
  if (!isAuthenticated) {
    return defer({ page: [] });
  }
  return defer({ page: getTodos(request) });
};
