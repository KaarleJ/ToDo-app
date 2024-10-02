import {
  Table,
  TableBody,
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
import { useAuth0 } from "@auth0/auth0-react";
import { CircleCheck as Finished, Ellipsis as UnFinished } from "lucide-react";
import PagesBar from "./PagesBar";

export default function Todos() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    console.log(location.pathname);
    loginWithRedirect({
      appState: { returnTo: location.pathname },
    });
  }
  const data = useLoaderData() as { todos: Todo[] };
  return (
    <div className="border rounded-md w-full h-[50rem] mb-24 flex flex-col">
      <Suspense fallback={<TodosSkeleton />}>
        <Await resolve={data.todos}>
          {(todos: Todo[]) => (
            <>
              <TopMenu />

              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32 md:w-60">Task</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="text-right w-20">Deadline</TableHead>
                    <TableHead className="text-center w-14 md:w-20">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todos.map((todo) => (
                    <TodoModal todo={todo} key={todo.id}>
                      <TableRow>
                        <TableCell width={36} className="truncate">
                          {todo.title}
                        </TableCell>
                        <TableCell className="truncate">
                          {todo.text}
                        </TableCell>
                        <TableCell className="text-right">
                          {format(new Date(todo.deadline), "d.M.yyyy")}
                        </TableCell>
                        <TableCell className="flex justify-center">
                          {todo.status ? <Finished className="text-primary" aria-details="Finished" /> : <UnFinished className="text-muted-foreground" aria-details="Unfinished" />}
                        </TableCell>
                      </TableRow>
                    </TodoModal>
                  ))}
                </TableBody>
              </Table>
              <PagesBar />
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
