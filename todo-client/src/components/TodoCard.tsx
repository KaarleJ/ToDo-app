import { Todo } from "../types";

const TodoCard = ({ todo }: { todo: Todo }) => {
    return (<div className="bg-purple-900 w-full my-3 rounded-lg shadow-lg shadow-indigo-700 p-3 text-white">
      <h1 className="text-3xl border-b border-purple-950 pb-1 pl-5 text-left text-ellipsis">{todo.title}</h1>
      <p className="text-xl text-ellipsis px-5 py-3 text-left sha">{todo.text}</p>
      
      {
        todo.completed && <img src='./done.png' alt="completed" className="w-4"></img>
      }
    </div>);
}

export default TodoCard;