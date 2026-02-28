import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, setPage } from "../store/todoSlice";
import TodoCard from "../components/TodoCard";
import LoadingState from "../components/LodingState";

function Completed() {
  const dispatch = useDispatch();
  const { todos, loading, error, pagination } = useSelector(
    (state) => state.todos,
  );

  useEffect(() => {
    dispatch(
      fetchAllTodos({
        page: pagination.page,
        limit: pagination.limit,
        status: "Completed",
      }),
    );
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
    return (
      <p className="text-center mt-10 text-gray-500">No completed todos.</p>
    );

  return (
    <div className="flex flex-col gap-3 px-20 py-6">
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default Completed;
