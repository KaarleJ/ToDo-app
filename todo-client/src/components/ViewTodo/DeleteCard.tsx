import { Todo } from "../../types";

interface DeleteCardProps {
  todo: Todo,
  setAction: (action: "edit" | "view" | "delete") => void;
}

const DeleteCard = ({ todo, setAction }: DeleteCardProps) => {

  return (
    <div className="relative px-8 py-5 max-w-72 sm:max-w-lg xl:max-w-3xl">
      delete here
    </div>
  );
  
};

export default DeleteCard;