import React from "react";

function Navbar() {
  return (
    <>
      <div className="min-h-25 flex justify-between mt-8 px-2 py-6 border-b-2 border-gray-400">
        <div className="flex flex-col gap-2">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold">MY TODO APP</h1>
          </div>
          <div className=" flex gap-8 text-xl">
            <h1>All</h1>
            <h1>Pending</h1>
            <h1>In-Progress</h1>
            <h1>Completed</h1>
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
