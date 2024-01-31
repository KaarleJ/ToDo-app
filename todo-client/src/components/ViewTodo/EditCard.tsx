import { Todo } from "../../types";

interface EditCardProps {
  todo: Todo,
  setAction: (action: "edit" | "view" | "delete") => void;
}

const EditCard = ({ todo, setAction }: EditCardProps) => {

  return (
    <div className="relative px-8 py-5 max-w-72 sm:max-w-lg xl:max-w-3xl">
      Edit here
    </div>
  );
  
};

export default EditCard;