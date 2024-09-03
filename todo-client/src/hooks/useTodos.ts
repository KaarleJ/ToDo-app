import { Todo } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from "swr";

const audience = import.meta.env.VITE_AUTH_AUDIENCE;
const apiUrl = import.meta.env.VITE_API_URL;

type StringTodo = {
  id: string;
  title: string;
  text: string;
  status: boolean;
  deadline: string;
};

export default function useTodos() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience,
          },
        });
        setToken(accessToken);
      } catch (e) {
        console.error(e);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const todosFetcher = async (url: string): Promise<Todo[]> => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const todos: StringTodo[] = await res.json();
    return todos.map((todo) => ({
      ...todo,
      deadline: parseISO(todo.deadline),
    }));
  }

  const { data, error, isLoading } = useSWR(
    token ? `${apiUrl}/api/todos` : null,
    todosFetcher
  );



  return { data, error, isLoading };
}
