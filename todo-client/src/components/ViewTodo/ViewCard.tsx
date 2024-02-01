import { Todo } from "../../types";
import { MdOutlineDone as Check } from "react-icons/md";

interface ViewCardProps {
  todo: Todo;
  setAction: (action: "edit" | "view" | "delete") => void;
}

const ViewCard = ({ todo, setAction }: ViewCardProps) => {
  let date: string | undefined;
  if (todo.deadLine) {
    date = new Date(todo.deadLine).toLocaleDateString("fi-FI");
  } else {
    date = "";
  }
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
      {todo.deadLine && (
        <p className="absolute left-8 bottom-16 text-white">Deadline: {date}</p>
      )}

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
  );
};

export default ViewCard;
