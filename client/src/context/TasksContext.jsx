// src/context/TasksContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io("http://127.0.0.1:5555", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => console.log("✅ Connected to WebSocket!"));
    socket.on("disconnect", () => console.log("❌ Disconnected from WebSocket!"));

    socket.on("task_created", (newTask) => {
      console.log("📥 Received task_created:", newTask);
      setTasks((prev) => [...prev, newTask]);
    });

    socket.on("task_updated", (updatedTask) => {
      console.log("🔄 Received task_updated:", updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });

    socket.on("task_deleted", ({ task_id }) => {
      console.log("🗑️ Received task_deleted:", task_id);
      setTasks((prev) => prev.filter((task) => task.id !== task_id));
    });

    return () => socket.disconnect();
  }, []);

  const fetchTasks = async (board_id) => {
    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:5555/api/boards/${board_id}/tasks`, {
        credentials: "include",
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title, description, status, board_id) => {
    try {
      await fetch("http://127.0.0.1:5555/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status, board_id }),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const editTask = async (task_id, updates) => {
    try {
      await fetch(`http://127.0.0.1:5555/api/tasks/${task_id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (task_id) => {
    try {
      await fetch(`http://127.0.0.1:5555/api/tasks/${task_id}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, fetchTasks, createTask, editTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
