import { Todo } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useRevalidator } from "react-router-dom";
import axios from "axios";

const audience = import.meta.env.VITE_AUTH_AUDIENCE;
const apiUrl = import.meta.env.VITE_API_URL;

export default function useTodoAction() {
  const revalidator = useRevalidator();
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await axios.post(`${apiUrl}/api/todos`, formattedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success!",
        description: "Todo created successfully",
      });
      revalidator.revalidate();
      return response.data;
    } catch (e) {
      console.error(e);
      toast({
        title: "Error!",
        description: e instanceof Error ? e.message : "Failed to create todo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (todo: Todo) => {
    setIsLoading(true);
    const formattedTodo = {
      ...todo,
      deadline: format(new Date(todo.deadline), "yyyy-MM-dd"),
    };
    try {
      const response = await axios.put(`${apiUrl}/api/todos`, formattedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success!",
        description: "Todo updated successfully",
      });
      revalidator.revalidate();
      return response.data;
    } catch (e) {
      console.error(e);
      toast({
        title: "Error!",
        description: e instanceof Error ? e.message : "Failed to update todo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${apiUrl}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast({
          title: "Success!",
          description: "Todo deleted successfully",
        });

        revalidator.revalidate();
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Error!",
        description: e instanceof Error ? e.message : "Failed to delete todo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createTodo, updateTodo, deleteTodo };
}
