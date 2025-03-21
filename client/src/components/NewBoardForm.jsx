import React, { useState, useContext } from "react";
import { BoardContext } from "../context/BoardsContext";

const NewBoardForm = () => {
  const { createBoard } = useContext(BoardContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createBoard(title, description);
      setTitle(""); // Clear input fields
      setDescription("");
    } catch (err) {
      setError("Failed to create board.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Create a New Board</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter board title"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter board description"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Board"}
      </button>
    </form>
  );
};

export default NewBoardForm;
