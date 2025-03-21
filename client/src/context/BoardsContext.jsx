import React, { createContext, useState, useEffect } from "react";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all boards
  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5555/api/boards", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch boards");
      }

      const data = await response.json();
      setBoards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create a new board
  const createBoard = async (title, description) => {
    try {
      const response = await fetch("http://127.0.0.1:5555/api/boards", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to create board");
      }

      const newBoard = await response.json();
      setBoards((prevBoards) => [...prevBoards, newBoard]); // Update state
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Auto-fetch boards when the context loads
  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards, loading, error, fetchBoards, createBoard }}>
      {children}
    </BoardContext.Provider>
  );
};
