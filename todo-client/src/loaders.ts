import { apiUrl } from "./lib/utils";
import { Todo } from "./types";
import apiClient from "./lib/apiClient";


export const todosLoader = async () => {
    const todosResponse = await apiClient.get<Todo[]>(`${apiUrl}/api/todos`);
    return todosResponse.data;
};
