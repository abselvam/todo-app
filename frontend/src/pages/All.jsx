import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, setPage } from "../store/todoSlice";
import TodoCard from "../components/TodoCard";
import EditTodoModal from "../components/EditTodoModal";
import LoadingState from "../components/LodingState";

function All() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  const { todos, loading, error, pagination } = useSelector(
    (state) => state.todos,
  );

  useEffect(() => {
    dispatch(fetchAllTodos({ page: pagination.page, limit: pagination.limit }));
  }, [pagination.page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-48 px-20 py-6">
        <LoadingState size={30} color="#0043A3" />
      </div>
    );
  }
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (todos.length === 0)
    return <p className="text-center mt-10 text-gray-500">No todos yet.</p>;

  return (
    <div className="flex flex-col gap-3 px-20 py-6">
      {/* Todo Cards */}
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          onEditClick={() => setIsEditOpen(true)}
        />
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 items-center">
        <button
          disabled={pagination.page === 1}
          onClick={() => dispatch(setPage(pagination.page - 1))}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => dispatch(setPage(pagination.page + 1))}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <EditTodoModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
}

export default All;
