import { apiUrl } from "./lib/utils";
import { Todo } from "./types";
import apiClient from "./lib/apiClient";

export const todosLoader = async () => {
  const todosResponse = await apiClient.get<Todo[]>(`${apiUrl}/api/todos`);
  // Sort the response by date
  /*
  const todos = todosResponse.data.sort((a, b) => {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
  */
  return todosResponse.data;
};
