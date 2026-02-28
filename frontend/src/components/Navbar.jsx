import { NavLink } from "react-router-dom";

function Navbar() {
  const tabClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold border-b-2 border-blue-600"
      : "text-gray-600 hover:text-blue-400";
  return (
    <>
      <div className="min-h-25 flex justify-between mt-8 px-2 py-6 border-b-2 border-gray-400">
        <div className="flex flex-col gap-2">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold">MY TODO APP</h1>
          </div>
          <div className=" flex gap-8 text-xl">
            <NavLink to="/" end className={tabClass}>
              All
            </NavLink>
            <NavLink to="/pending" className={tabClass}>
              Pending
            </NavLink>
            <NavLink to="/in-progress" className={tabClass}>
              In-Progress
            </NavLink>
            <NavLink to="/completed" className={tabClass}>
              Completed
            </NavLink>
          </div>
        </div>
        <div className="p-8 flex justify-center items-center">
          <div className="bg-blue-700 w-40 h-14 rounded-2xl p-4 flex justify-center items-center">
            <h1 className="text-xl text-white">Add new Todo</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
