import { Todo } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSWRConfig } from "swr"
import { format } from "date-fns";

const audience = import.meta.env.VITE_AUTH_AUDIENCE;
const apiUrl = import.meta.env.VITE_API_URL;

export default function useTodoAction() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig()

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

  const createTodo = async (todo: Omit<Todo, "id">) => {
    setIsLoading(true);
    const formattedTodo = {
      ...todo,
      deadline: format(new Date(todo.deadline), "yyyy-MM-dd"),
    };
    try {
      const response = await fetch(`${apiUrl}/api/todos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedTodo),
      });
      if (response.ok) {
        const newTodo = await response.json();
        toast({
          title: "Success!",
          description: "Todo created successfully",
        });
        mutate(`${apiUrl}/api/todos`)
        return newTodo;
      } else {
        throw new Error("Failed to create todo");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        toast({
          title: "Error!",
          description: e.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (todo: Todo) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/todos`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (response.ok) {
        const updatedTodo = await response.json();
        toast({
          title: "Success!",
          description: "Todo updated successfully",
        });
        mutate(`${apiUrl}/api/todos`);
        return updatedTodo;
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        toast({
          title: "Error!",
          description: e.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Todo deleted successfully",
        });
        mutate(`${apiUrl}/api/todos`);
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        toast({
          title: "Error!",
          description: e.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createTodo, updateTodo, deleteTodo };
}
