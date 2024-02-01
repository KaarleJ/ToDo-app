import { Todo } from "../../types";
import TodoForm from "../TodoForm";

interface EditCardProps {
  todo: Todo;
  onClose: () => void;
  putTodo: (
    id: number,
    title: string,
    text: string,
    completed: boolean,
    deadLine: string
  ) => Promise<void>;
}

const EditCard = ({ todo, onClose, putTodo }: EditCardProps) => {
  const handlePutTodo = async ({
    title,
    text,
    completed,
    deadLine,
  }: {
    title: string;
    text: string;
    deadLine: string;
    completed: boolean;
  }) => {
    await putTodo(todo.id, title, text, completed, deadLine);
    onClose();
  };

  let date: string | undefined;
  if (typeof todo.deadLine !== "string") {
    date = '';
  } else {
    date = todo.deadLine;
  }

  return (
    <>
      <TodoForm
        className="p-10"
        title="Create a new ToDo"
        initialValues={{ title: todo.title, text: todo.text, deadLine: date, completed: todo.completed }}
        onSubmit={handlePutTodo}
      />
    </>
  );
};

export default EditCard;
