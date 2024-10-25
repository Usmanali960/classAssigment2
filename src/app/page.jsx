"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleInput = (e) => setTodo(e.target.value);

  const handleAdd = () => {
    if (todo.trim() === "") {
      alert("Todo should not be empty");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleCheckBox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setIsEditing(id);
    setTodo(todoToEdit.todo);
  };

  const handleUpdate = () => {
    setTodos(
      todos.map((item) =>
        item.id === isEditing ? { ...item, todo } : item
      )
    );
    setTodo("");
    setIsEditing(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this todo?")) {
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleToggleCompleted = () => setShowCompleted(!showCompleted);

  const filteredTodos = showCompleted
    ? todos.filter((item) => item.isCompleted)
    : todos;

  return (
    <>
      <div className="flex items-center justify-center w-screen flex-col mt-5 p-4">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>

        <div className="addSection flex flex-col sm:flex-row w-full sm:w-1/2 mb-4 gap-2">
          <input
            onChange={handleInput}
            value={todo}
            type="text"
            className="flex-1 outline-none border-2 rounded-lg p-2 border-gray-500"
            placeholder="Enter a todo..."
          />
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-green-500 p-2 text-white rounded-md hover:bg-green-800"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-violet-500 p-2 text-white rounded-md hover:bg-violet-800"
            >
              Add
            </button>
          )}
        </div>

        <button
          onClick={handleToggleCompleted}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 mb-4"
        >
          {showCompleted ? "Show All Todos" : "Show Completed Todos"}
        </button>

        <div className="todos w-full sm:w-1/2">
          {filteredTodos.length === 0 ? (
            <h1 className="text-xl font-bold text-center">No todos available</h1>
          ) : (
            filteredTodos.map((item) => (
              <div
                key={item.id}
                className="todoArea flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
              >
                <div className="flex items-center w-3/4">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckBox(item.id)}
                    className="mr-2"
                  />
                  <h1
                    className={`${item.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                  >
                    {item.todo}
                  </h1>
                </div>
                <div className="btn flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
