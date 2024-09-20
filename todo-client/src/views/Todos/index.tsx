import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TodoModal from "@/components/TodoModal";
import { format } from "date-fns";
import { Await, useLoaderData } from "react-router-dom";
import { Todo } from "@/types";
import TopMenu from "./TopMenu";
import { Suspense } from "react";
import TodosSkeleton from "./TodosSkeleton";

export default function Todos() {
  const data = useLoaderData() as { todos: Todo[] };
  return (
    <div className="border rounded-md w-full h-[30rem] mb-24 flex flex-col">
      <Suspense fallback={<TodosSkeleton />}>
        <Await resolve={data.todos}>
          {(todos: Todo[]) => (
            <>
              <TopMenu />

              <Table>
                <TableCaption>A list of your tasks</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todos.map((todo) => (
                    <TodoModal todo={todo} key={todo.id}>
                      <TableRow>
                        <TableCell className="text-nowrap w-max">
                          {todo.title}
                        </TableCell>
                        <TableCell className=" text-nowrap">
                          {todo.text}
                        </TableCell>
                        <TableCell className="w-32">
                          {format(new Date(todo.deadline), "d.M.yyyy")}
                        </TableCell>
                        <TableCell className="text-right w-32">
                          {todo.status ? "Finished" : "Unfinished"}
                        </TableCell>
                      </TableRow>
                    </TodoModal>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
