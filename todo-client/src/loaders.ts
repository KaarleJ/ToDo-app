import { apiUrl, calculateItemsPerPage } from "./lib/utils";
import { Todo } from "./types";
import { defer } from "react-router-dom";
import apiClient from "./lib/apiClient";

async function getTodos(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  searchParams.append("size", calculateItemsPerPage().toString());
  const todosResponse = await apiClient.get<Todo[]>(`${apiUrl}/api/todos`, {
    params: searchParams,
  });
  return todosResponse.data;
}

export const todosLoader = async (
  request: Request,
  isAuthenticated: boolean
) => {
  if (!isAuthenticated) {
    return defer({ page: [] });
  }
  return defer({ page: getTodos(request) });
};
