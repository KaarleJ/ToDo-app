import { Todo } from "../types";
import { MdOutlineDone as Check } from "react-icons/md";

interface TodoCardProps {
  todo: Todo;
  onClick?: () => void;
}

const TodoCard = ({ todo, onClick }: TodoCardProps) => {
  return (
    <button
      className="relative bg-purple-900 w-full my-3 rounded-lg shadow-lg shadow-indigo-700 p-3 text-white"
      onClick={onClick}
    >
      <h1 className="text-3xl border-b border-purple-950 pb-1 pl-5 text-left text-ellipsis">
        {todo.title}
      </h1>
      <p className="text-xl text-ellipsis px-5 py-3 text-left min-h-20">
        {todo.text}
      </p>

      {todo.completed && (
        <Check className="bg-green-600 w-5 h-5 rounded-full absolute right-5 bottom-3 text-purple-900" />
      )}
    </button>
  );
};

export default TodoCard;
