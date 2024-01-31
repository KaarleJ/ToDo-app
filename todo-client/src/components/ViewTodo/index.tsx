import { Todo } from "../../types";
import { useState } from "react";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";

interface PreviewCardProps {
  todo: Todo;
}

const PreviewCard = ({ todo }: PreviewCardProps) => {
  const [action, setAction] = useState<"edit" | "view" | "delete">("view");

  switch (action) {
    case "view":
      return <ViewCard todo={todo} setAction={setAction} />;
    case "edit":
      return <EditCard todo={todo} setAction={setAction} />;
    case "delete":
      return <DeleteCard todo={todo} setAction={setAction} />;
  }
};

export default PreviewCard;
