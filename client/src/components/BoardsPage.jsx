import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BoardsContext } from "../context/BoardsContext";
import { AuthContext } from "../context/AuthContext";
import BoardEditForm from "./BoardEditForm";

function BoardsPage() {
  const { boards, fetchBoards, createBoard, updateBoard, deleteBoard } = useContext(BoardsContext);
  const { currentUser, loggedin } = useContext(AuthContext);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingBoard, setEditingBoard] = useState(null);

  useEffect(() => {
    if (loggedin) {
      fetchBoards();
    }
  }, [loggedin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    createBoard({ title, description });
    setTitle("");
    setDescription("");
  };

  const handleUpdate = (updatedBoard) => {
    updateBoard(updatedBoard);
    setEditingBoard(null);
  };


  const handleDelete = (id) => {
    deleteBoard(id);
  };


  return (
    <div style={{ textAlign: "center" }}>
      

      <h2>All Boards</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter board description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>

      {boards.length > 0 ? (
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <Link to={`/boards/${board.id}`}>{board.title}</Link>
              <button onClick={() => setEditingBoard(board)}>Edit</button>
              <button onClick={() => handleDelete(board.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No boards found.</p>
      )}

      {editingBoard && (
        <BoardEditForm
          board={editingBoard}
          onUpdate={handleUpdate}
          onCancel={() => setEditingBoard(null)}
        />
      )}
    </div>
  );
}

export default BoardsPage;
