import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // ✅ Ensure the path is correct


const Navbar = () => {
  const { currentUser, loggedin, logout_user } = useContext(AuthContext);  // ✅ Get auth state

  return (
    <>
      <h1>TaskTogether</h1>
      <ul>
        {loggedin ? (
          <>
            <li><span>Welcome, {currentUser.username}!</span></li>
            <li><button onClick={logout_user}>Logout</button></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/boards">Boards</Link></li>
            <li><Link to="/new-board">Create Board</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/"></Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </>
  );
};

export default Navbar;
