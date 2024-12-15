import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { MouseEvent } from "react";
import { Check as Finished, LoaderCircle } from "lucide-react";
import useTodoAction from "@/hooks/useTodoAction";
import { Todo } from "@/types";

export default function CheckTodo({ todo }: { todo: Todo }) {
  const { isLoading, updateTodo } = useTodoAction();

  async function changeStatus(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    await updateTodo({
      ...todo,
      deadline: new Date(todo.deadline),
      status: !todo.status,
    });
  }

  return (
    <TableCell className="flex justify-center items-center h-[4.5rem]">
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          onClick={changeStatus}
        >
          {todo.status && <Finished className="text-green-600" size={24} />}
        </Button>
      )}
    </TableCell>
  );
}
