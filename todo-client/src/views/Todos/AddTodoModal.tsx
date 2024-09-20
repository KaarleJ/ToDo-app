
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PlusIcon as Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoFormSchema } from "@/lib/schemas";
import TodoForm from "@/components/TodoForm";
import { Form, FormMessage } from "@/components/ui/form";
import useTodoAction from "@/hooks/useTodoAction";
import { useState } from "react";



export default function AddTodoModal() {
  const { isLoading, createTodo } = useTodoAction();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      text: "",
      status: false,
      deadline: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof todoFormSchema>) {
    try {
      await createTodo(data);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className=" px-4 py-2">
          Create <Plus size={22} className="ml-1"/>
        </Button>
      </ModalTrigger>
      <ModalContent className="flex flex-col p-4">
        <ModalHeader>
          <ModalTitle>Add Todo</ModalTitle>
          <ModalDescription>Add a new Todo to your list</ModalDescription>
        </ModalHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TodoForm form={form} />
            <div className="flex flex-row justify-between">
              <div className="flex items-center">
                <Button type="submit" disabled={isLoading}>
                  Submit
                </Button>
              </div>
              <ModalClose>Cancel</ModalClose>
            </div>
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
}