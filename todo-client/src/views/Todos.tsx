import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import TodoModal from "@/components/TodoModal";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon as Plus } from "lucide-react";
import useTodos from "@/hooks/useTodos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoFormSchema } from "@/lib/schemas";
import TodoForm from "@/components/TodoForm";
import { Form, FormMessage } from "@/components/ui/form";
import useTodoAction from "@/hooks/useTodoAction";
import { format } from "date-fns";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function Todos() {
  const { data, error, isLoading } = useTodos();

  if (error) {
    console.error(error);
  }

  return (
    <div className="border rounded-md w-full h-[30rem] mb-24 relative flex flex-col">
      <TopMenu />

      {isLoading ? (
        <Loader />
      ) : (
        <Table>
          <TableCaption>
            {error ? "Error fetching tasks" : "A list of your tasks"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((task) => (
                <TodoModal todo={task} key={task.id}>
                  <TableRow>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{format(task.deadline, "d.M.yyyy")}</TableCell>
                    <TableCell className="text-right">
                      {task.status ? "Finished" : "Unfinished"}
                    </TableCell>
                  </TableRow>
                </TodoModal>
              ))}
          </TableBody>
        </Table>
      )}
      <ToolBar />
    </div>
  );
}

function TopMenu() {
  return (
    <div className="w-full border-b h-min px-4 py-2 flex items-center justify-between rounded-t-md">
      <div>
        <h3>Todos</h3>
        <p className="brightness-75 text-sm">Manage your tasks</p>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="filter tasks" />
        <Button type="submit">Search</Button>
      </div>
    </div>
  );
}

function ToolBar() {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-center justify-between">
      <AddTodoModal />
    </div>
  );
}

function AddTodoModal() {
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
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="rounded-full w-10 h-10 px-0 py-0">
          <Plus size={26} />
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
