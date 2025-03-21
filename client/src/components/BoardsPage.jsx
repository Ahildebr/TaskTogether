import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../context/BoardsContext";
import NewBoardForm from "./NewBoardForm";

const BoardsPage = () => {
  const { boards, loading, error } = useContext(BoardContext); // ✅ Get boards from context

  if (loading) return <p>Loading boards...</p>;
  if (error) return <p>Error loading boards: {error}</p>;

  return (
    <div>
      <h2>All Boards</h2>
      <NewBoardForm />
      <ul>
        {boards.length > 0 ? (
          boards.map((board) => (
            <li key={board.id}>
              <Link to={`/boards/${board.id}`}>{board.title}</Link>
            </li>
          ))
        ) : (
          <p>No boards found.</p>
        )}
      </ul>
    </div>
  );
};

export default BoardsPage;

