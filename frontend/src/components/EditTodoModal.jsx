// src/components/EditTodoModal.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, clearSelectedTodo } from "../store/todoSlice";

function EditTodoModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { selectedTodo, loading } = useSelector((state) => state.todos);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  // pre-fill fields when selectedTodo changes
  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description || "");
      setStatus(selectedTodo.status);
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      editTodo({
        id: selectedTodo._id,
        updateFields: { title, description, status },
      }),
    );
    handleClose();
  };

  const handleClose = () => {
    dispatch(clearSelectedTodo());
    onClose();
  };

  if (!isOpen) return null;

  return (
    // backdrop
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      {/* card */}
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Todo</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Add a description..."
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Todo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;
