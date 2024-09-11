import { Todo } from "@/types";
import { useState } from "react";
import { useToast } from "kaarlejshadcn";
import { format } from "date-fns";
import { useRevalidator } from "react-router-dom";
import apiClient, { useAxiosInterceptor } from "@/lib/apiClient";
const apiUrl = import.meta.env.VITE_API_URL;

export default function useTodoAction() {
  const revalidator = useRevalidator();
  useAxiosInterceptor();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createTodo = async (todo: Omit<Todo, "id">) => {
    setIsLoading(true);
    const formattedTodo = {
      ...todo,
      deadline: format(new Date(todo.deadline), "yyyy-MM-dd"),
    };
    try {
      const response = await apiClient.post(
        `${apiUrl}/api/todos`,
        formattedTodo
      );
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
      const response = await apiClient.put(
        `${apiUrl}/api/todos`,
        formattedTodo
      );
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
      const response = await apiClient.delete(`${apiUrl}/api/todos/${id}`);
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
