import { Todo } from "../../types";
import { MdOutlineDone as Check } from "react-icons/md";

interface ViewCardProps {
  todo: Todo;
  setAction: (action: "edit" | "view" | "delete") => void;
}

const ViewCard = ({ todo, setAction }: ViewCardProps) => {
  return (
    <div className="relative px-8 py-5 max-w-72 sm:max-w-lg xl:max-w-3xl">
      <h1 className="text-white text-left text-ellipsis border-b pb-1 border-purple-950 text-3xl">
        {todo.title}
      </h1>
      <p className="text-white text-xl py-4 text-wrap text-left min-h-28">
        {todo.text}
      </p>

      {todo.completed && (
        <Check className="bg-green-600 w-5 h-5 rounded-full absolute right-5 bottom-7 text-purple-900" />
      )}

      <div>
        <button
          className="mx-3 shadow-xl text-xl text-white bg-purple-400 rounded-md px-3 py-1"
          onClick={() => setAction("edit")}
        >
          edit
        </button>
        <button
          className="mx-3 shadow-xl text-xl text-white bg-purple-400 rounded-md px-3 py-1"
          onClick={() => setAction("delete")}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default ViewCard;
