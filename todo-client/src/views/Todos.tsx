import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useTodos from "@/hooks/useTodos";

export default function Todos() {
  const { data, error, isLoading } = useTodos();

  if (error) {
    console.error(error);
    return <div>Error loading todos</div>;
  }

  if (isLoading) {
    return <div>Loading todos...</div>;
  }
  return (
    <div className="border rounded-md w-full h-[30rem] mb-24 ">
      <TopMenu />
      <Table>
        <TableCaption>A list of your tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Take the trash out</TableCell>
            <TableCell>25.4.2024</TableCell>
            <TableCell className="text-right">done</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function TopMenu() {
  return (
    <div className="w-full border-b h-min px-4 py-2 flex items-center justify-between rounded-t-md shadow-lg">
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
