import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  ModalBody,
} from "@/components/ui/modal";
import { Todo } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TodoForm from "./TodoForm";
import { Button } from "./ui/button";
import { FormMessage, Form } from "./ui/form";
import { z } from "zod";
import { todoFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useTodoAction from "@/hooks/useTodoAction";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";

export default function TodoModal({
  children,
  todo,
}: {
  children: React.ReactNode;
  todo: Todo;
}) {
  const { isLoading, updateTodo, deleteTodo } = useTodoAction();
  const [edit, setEdit] = useState(false);

  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todo.title,
      text: todo.text,
      status: todo.status,
      deadline: todo.deadline,
    },
  });

  async function onSubmit(data: z.infer<typeof todoFormSchema>) {
    try {
      await updateTodo({
        ...data,
        id: todo.id,
      });
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  }

  async function onDelete() {
    try {
      await deleteTodo(todo.id);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Modal>
      <ModalTrigger asChild className="hover:cursor-pointer">
        {children}
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{todo.title}</ModalTitle>
          <ModalDescription>
            {todo.status ? "Finished" : "Unfinished"}
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          {!edit ? (
            <div className="h-[10rem] flex flex-col items-start justify-between">
              <p className="my-2">{todo.text}</p>
              <p className="my-4 text-muted-foreground">
                Deadline: {format(todo.deadline, "d.M.yyyy")}
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <TodoForm form={form} />
                <div className="flex justify-between">
                  <Button type="submit" disabled={isLoading}>
                    Submit
                  </Button>
                  <Button variant="ghost" onClick={() => setEdit(false)}>
                    Cancel
                  </Button>
                </div>
                <FormMessage>{form.formState.errors.root?.message}</FormMessage>
              </form>
            </Form>
          )}
        </ModalBody>
        {!edit && (
          <div className="flex justify-between">
            <div className="flex pl-4">
              <Button onClick={() => setEdit(true)}>Edit</Button>
              <Button
                onClick={onDelete}
                disabled={isLoading}
                variant="destructive"
                className="ml-4"
              >
                Delete
              </Button>
              {isLoading && (
                <LoaderCircle
                  className="animate-spin justify-self-start m-2"
                  size={24}
                />
              )}
            </div>
            <ModalClose className="mr-4 px-4">Close</ModalClose>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
