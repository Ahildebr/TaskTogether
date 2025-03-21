import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const socket = io("http://127.0.0.1:5555");

  socket.on("connect", () => console.log("✅ Connected to WebSocket!"));
  socket.on("disconnect", () => console.log("❌ Disconnected from WebSocket!"));

  socket.onAny((event, data) => {
    console.log(`📩 Received WebSocket event: ${event}`, data); // ✅ Debugging Log
  });

  socket.on("task_created", (newTask) => {
    console.log("📥 Received task_created:", newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  });

  socket.on("task_updated", (updatedTask) => {
    console.log("🔄 Received task_updated:", updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  });

  socket.on("task_deleted", ({ task_id }) => {
    console.log("🗑️ Received task_deleted:", task_id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== task_id));
  });

  return () => socket.disconnect();
}, []);



  // ✅ Fetch tasks for a specific board
  const fetchTasks = async (board_id) => {
    try {
      setLoading(true);
  
      const response = await fetch(`http://127.0.0.1:5555/api/boards/${board_id}/tasks`, {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }
  
      const data = await response.json();
      
      setTasks((prevTasks) => {
        // ✅ Only update state if data is actually different
        if (JSON.stringify(prevTasks) !== JSON.stringify(data)) {
          return data;
        }
        return prevTasks;
      });
  
    } catch (err) {
      console.error("❌ Fetch tasks error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  // ✅ Create a new task
  const createTask = async (title, description, status, board_id) => {
    try {
      const response = await fetch("http://127.0.0.1:5555/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status, board_id }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
  
      const newTask = await response.json();
  
      // ✅ Ensure all fields are present before adding to state
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: newTask.id,
          title: newTask.title || "Untitled Task", // Fallback in case title is missing
          description: newTask.description || "No description",
          status: newTask.status || "To Do",
          board_id: newTask.board_id,
        },
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editTask = async (task_id, updates) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/api/tasks/${task_id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
  
      const updatedTask = await response.json();
      
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === task_id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };
  
  const deleteTask = async (task_id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/api/tasks/${task_id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
  
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== task_id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
