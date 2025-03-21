import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { currentUser, loggedin } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (loggedin) {
      fetch("http://127.0.0.1:5555/api/boards", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setBoards(data))
        .catch((err) => console.error("Error fetching boards:", err));
    } else {
      setBoards([]);
    }
  }, [loggedin]);

  return (
    <div>
      <h2>Welcome, {currentUser?.username}!</h2>
      <h3>Your Boards:</h3>
      {boards.length > 0 ? (
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <Link to={`/boards/${board.id}`}>{board.title}</Link>  {/* ✅ Make Board Clickable */}
            </li>
          ))}
        </ul>
      ) : (
        <p>{loggedin ? "You have no boards yet." : "Please log in to see your boards."}</p>
      )}
    </div>
  );
};

export default Dashboard;
