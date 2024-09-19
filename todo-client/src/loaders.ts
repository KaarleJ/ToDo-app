import { apiUrl } from "./lib/utils";
import { Todo } from "./types";
import apiClient from "./lib/apiClient";
import { defer } from "react-router-dom";

async function getTodos(request: Request) {
  const url = new URL(request.url);
  const todosResponse = await apiClient.get<Todo[]>(`${apiUrl}/api/todos`, {
    params: url.searchParams,
  });
  return todosResponse.data;
}

export const todosLoader = async ({ request }: { request: Request }) => {
  return defer({ todos: getTodos(request) });
};
