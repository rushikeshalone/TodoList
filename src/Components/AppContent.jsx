import { useEffect, useState } from "react";
import { TodoProvider } from "../Context";
import { TodoForm, TodoItem } from "../Components";

function AppContent() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from API and localStorage
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://todo-production-0c09.up.railway.app/user/todos",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await fetch(
        "https://todo-production-0c09.up.railway.app/user/savetodos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) throw new Error("Failed to add todo");
      const newTodo = await response.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(
        `https://todo-production-0c09.up.railway.app/user/updatetodo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      if (!response.ok) throw new Error("Failed to update todo");
      const todo = await response.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...todo, ...updatedTodo } : t))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://todo-production-0c09.up.railway.app/user/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Let's Chase It, Make It
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default AppContent;
