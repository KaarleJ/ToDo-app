import { apiUrl, audience } from "./lib/utils";
import { Todo } from "./types";
import axios from "axios";
import { defer } from "react-router-dom";
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

async function getTodos(request: Request, token: string) {
  const url = new URL(request.url);
  const todosResponse = await axios.get<Todo[]>(`${apiUrl}/api/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: url.searchParams,
  });
  return todosResponse.data;
}

export const todosLoader = async (
  request: Request,
  getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string>
) => {
  const token = await getAccessTokenSilently({
    authorizationParams: {
      audience,
    },
  });
  return defer({ todos: getTodos(request, token) });
};
