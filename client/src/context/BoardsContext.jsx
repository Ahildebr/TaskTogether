// src/context/BoardsContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBoards();

    const socket = io("http://127.0.0.1:5555", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("board_created", (newBoard) => {
      console.log("📥 Received board_created:", newBoard);
      setBoards((prev) => [...prev, newBoard]);
    });

    socket.on("board_updated", (updatedBoard) => {
      console.log("🔄 Received board_updated:", updatedBoard);
      setBoards((prev) =>
        prev.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        )
      );
    })

    return () => socket.disconnect();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5555/api/boards", {
        credentials: "include",
      });
      const data = await res.json();
      setBoards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (title, description) => {
    try {
      await fetch("http://127.0.0.1:5555/api/boards", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
    } catch (err) {
      setError(err.message);
    }
  };


  const updateBoard = async (id, updatedData) => {
    try {
      const res = await fetch(`http://127.0.0.1:5555/api/boards/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!res.ok) throw new Error("Failed to update board");
      const updated = await res.json();
  
      // this isn't necessary unless WebSocket fails
      setBoards((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      );
    } catch (err) {
      setError(err.message);
    }
  };



  const deleteBoard = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5555/api/boards/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!res.ok) throw new Error("Failed to delete board");
  
      setBoards((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };
  
  const inviteUserToBoard = async (boardId, username) => {
    try {
      const res = await fetch(`/api/boards/${boardId}/add_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username }),
      });
  
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to invite user.");
      }
  
      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
  

  return (
    <BoardsContext.Provider value={{ boards, loading, error, fetchBoards, createBoard, updateBoard, deleteBoard, inviteUserToBoard }}>
      {children}
    </BoardsContext.Provider>
  );
};
