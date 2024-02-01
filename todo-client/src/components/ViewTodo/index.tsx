import { Todo } from "../../types";
import { useState } from "react";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";

interface PreviewCardProps {
  todo: Todo;
  putTodo: (
    id: number,
    title: string,
    text: string,
    completed: boolean,
    deadLine: string
  ) => Promise<void>;
  deleteTodo: (id: number) => void;
  onClose: () => void;
}

const PreviewCard = ({
  todo,
  putTodo,
  deleteTodo,
  onClose,
}: PreviewCardProps) => {
  const [action, setAction] = useState<"edit" | "view" | "delete">("view");

  switch (action) {
    case "view":
      return <ViewCard todo={todo} setAction={setAction} />;
    case "edit":
      return <EditCard todo={todo} onClose={onClose} putTodo={putTodo} />;
    case "delete":
      return (
        <DeleteCard
          todo={todo}
          setAction={setAction}
          deleteTodo={deleteTodo}
          onClose={onClose}
        />
      );
  }
};

export default PreviewCard;
