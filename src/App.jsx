import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './Context/index'
import { TodoForm, TodoItem } from './Components'
import Card from './Components/Card'


function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    // Fetch data inside useEffect
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://todo-production-0c09.up.railway.app/user/todos"); // Example API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Rushi",data); // Log fetched data to the console
        setTodos(data); // Update user state with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the function to fetch data
  }, []);

  // const addTodo = (todo) => {

  //   setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  // }

  const addTodo = async (todo) => {
    try {
      debugger;
      
      // Make API call to add a new todo
      const response = await fetch("https://todo-production-0c09.up.railway.app/user/savetodos", {
        method: "POST", // Use POST method to add a new todo
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo), // Send the todo data as the body
      });
  
      if (!response.ok) {
        throw new Error("Failed to add the todo");
      }
  
      const newTodo = await response.json(); // Get the added todo from the server
  
      // Update the local state to include the new todo
      setTodos((prev) => [{ id: newTodo.id, ...todo }, ...prev]); // Prepending the new todo
    } catch (error) {
      console.error("Error adding the todo:", error);
    }
  };
  

  // const updateTodo = (id, todo) => {
  //   debugger;
  //   setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

  // }

  const updateTodo = async (id, todo) => {
    try {
      // Make API call to update the todo on the server
      const response = await fetch(`https://todo-production-0c09.up.railway.app/user/updatetodo`, {
        method: "PUT", // Use PUT or PATCH based on your API specification
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the todo");
      }
  
      const updatedTodo = await response.json();
  
      // Update the todo in the local state
      setTodos((prev) =>
        prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
      );
    } catch (error) {
      console.error("Error updating the todo:", error);
    }
  };
  

  // const deleteTodo = (id) => {
  //   setTodos((prev) => prev.filter((todo) => todo.id !== id))
  // }

  const deleteTodo = async (id) => {
    try {
      // Make API call to delete the todo on the server
      const response = await fetch(`https://todo-production-0c09.up.railway.app/user/todos/${id}`, {
        method: "DELETE", // Use DELETE method
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete the todo");
      }
  
      // Update the local state to remove the deleted todo
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting the todo:", error);
    }
  };
  

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                    {/* <div>
                      <Card />
                    </div> */}
                </div>
            </div>
    </TodoProvider>
  )
}

export default App