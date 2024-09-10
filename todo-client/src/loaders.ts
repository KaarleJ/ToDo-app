import { apiUrl, audience } from "./lib/utils";
import axios from "axios";
import { LoaderFunction } from "react-router-dom";
import { Todo } from "./types";
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

interface TodosLoaderParams {
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string>;
}

export const todosLoader = ({
  getAccessTokenSilently,
}: TodosLoaderParams): LoaderFunction => {
  return async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience,
      },
    });

    const todosResponse = await axios.get<Todo[]>(`${apiUrl}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return todosResponse.data;
  };
};
