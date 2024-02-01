import { Todo } from "../../types";

interface DeleteCardProps {
  todo: Todo;
  setAction: (action: "edit" | "view" | "delete") => void;
  deleteTodo: (id: number) => void;
  onClose: () => void;
}

const DeleteCard = ({ todo, setAction, deleteTodo, onClose }: DeleteCardProps) => {

  const handleDelete = () => {
    deleteTodo(todo.id)
    onClose()
  }

  return (
    <div className="px-8 py-5 max-w-72 sm:max-w-lg xl:max-w-3xl">
      <h1 className="text-3xl text-white mx-10">Delete ToDo</h1>
      <p className="m-5 text-xl text-white">
        Are you sure you want to delete this ToDo?
      </p>
      <button
        className="mx-3 shadow-xl text-xl text-white bg-purple-400 rounded-md px-3 py-1"
        onClick={() => setAction("view")}
      >
        cancel
      </button>
      <button
        className="mx-3 shadow-xl text-xl text-white bg-purple-400 rounded-md px-3 py-1"
        onClick={handleDelete}
      >
        delete
      </button>
    </div>
  );
};

export default DeleteCard;
