import { Pencil, Trash } from "lucide-react";

function TodoCard() {
  return (
    <div className="flex flex-col gap-2 p-8 border-2 border-gray-400 rounded-xl">
      <div className="flex justify-between mb-6">
        <div className="rounded-3xl bg-blue-500/80 p-2 px-4">
          <p className="text-xs">In-Progress</p>
        </div>
        <div className="flex gap-14">
          <div>
            <Pencil />
          </div>
          <div>
            <Trash />
          </div>
        </div>
      </div>
      <div className="text-3xl mb-4">
        <h1>Task 1</h1>
      </div>
      <div className="text-xl mb-4">
        <h1>Description of task 1</h1>
      </div>
      <div className="text-sm text-gray-500">
        <h1>Created At: Feb 22, 2026</h1>
      </div>
    </div>
  );
}

export default TodoCard;
