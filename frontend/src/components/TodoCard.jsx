import { Pencil, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTodo, setSelectedTodo } from "../store/todoSlice";

function TodoCard({ todo, onEditClick }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const handleEdit = () => {
    dispatch(setSelectedTodo(todo)); // pre-fills the edit modal
    onEditClick(); // opens the modal
  };

  const statusColors = {
    Pending: "bg-yellow-400/80",
    "In-Progress": "bg-blue-500/80",
    Completed: "bg-green-500/80",
  };

  const formattedDate = new Date(todo.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-2 p-8 border-2 border-gray-400 rounded-xl">
      <div className="flex justify-between mb-6">
        <div className={`rounded-3xl ${statusColors[todo.status]} p-2 px-4`}>
          <p className="text-xs">{todo.status}</p>
        </div>
        <div className="flex gap-14">
          <div
            className="cursor-pointer hover:text-blue-500"
            onClick={handleEdit}
          >
            <Pencil />
          </div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={handleDelete}
          >
            <Trash />
          </div>
        </div>
      </div>
      <div className="text-3xl mb-4">
        <h1>{todo.title}</h1>
      </div>
      <div className="text-xl mb-4">
        <h1>{todo.description || "No description provided"}</h1>
      </div>
      <div className="text-sm text-gray-500">
        <h1>Created At: {formattedDate}</h1>
      </div>
    </div>
  );
}

export default TodoCard;
