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
import { useLoaderData } from "react-router-dom";
import { Todo } from "@/types";
import TopMenu from "./TopMenu";
import ToolBar from "./ToolBar";

export default function Todos() {
  const todos = useLoaderData() as Todo[];
  return (
    <div className="border rounded-md w-full h-[30rem] mb-24 relative flex flex-col">
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
          {todos &&
            todos.map((todo) => (
              <TodoModal todo={todo} key={todo.id}>
                <TableRow>
                  <TableCell className="text-nowrap w-max">
                    {todo.title}
                  </TableCell>
                  <TableCell className=" text-nowrap">{todo.text}</TableCell>
                  <TableCell className="w-32">
                    {format(todo.deadline, "d.M.yyyy")}
                  </TableCell>
                  <TableCell className="text-right w-32">
                    {todo.status ? "Finished" : "Unfinished"}
                  </TableCell>
                </TableRow>
              </TodoModal>
            ))}
        </TableBody>
      </Table>
      <ToolBar />
    </div>
  );
}