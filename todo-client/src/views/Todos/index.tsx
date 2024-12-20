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
import { Todo, TodosPage } from "@/types";
import TopMenu from "./TopMenu";
import { Suspense } from "react";
import TodosSkeleton from "./TodosSkeleton";
import PagesBar from "./PagesBar";
import CheckTodo from "./CheckTodo";

export default function Todos() {
  const data = useLoaderData() as { page: Todo[] };
  return (
    <div className="border rounded-md mb-6 md:mb-12 min-h-[45rem] md:min-h-[40rem] 3xl:min-h-[55rem] flex flex-col relative pb-8">
      <Suspense fallback={<TodosSkeleton />}>
        <Await resolve={data.page}>
          {(page: TodosPage) => (
            <>
              <TopMenu />
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32 md:w-60">Task</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="text-right w-20">Deadline</TableHead>
                    <TableHead className="text-center w-14 md:w-20">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {page.content.map((todo) => (
                    <TodoModal todo={todo} key={todo.id}>
                      <TableRow>
                        <TableCell width={36} className="truncate">
                          {todo.title}
                        </TableCell>
                        <TableCell className="truncate">{todo.text}</TableCell>
                        <TableCell className="text-right">
                          {format(new Date(todo.deadline), "d.M.yyyy")}
                        </TableCell>
                        <CheckTodo todo={todo} />
                      </TableRow>
                    </TodoModal>
                  ))}
                </TableBody>
              </Table>
              <PagesBar
                pages={page.totalPages}
                first={page.first}
                last={page.last}
                number={page.number + 1}
              />
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
