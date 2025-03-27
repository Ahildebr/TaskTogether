import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

const Navbar = () => {
  const { currentUser, loggedin, logout_user } = useContext(AuthContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            TaskTogether
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          {loggedin ? (
            <>
              <Typography variant="body1" sx={{ alignSelf: "center" }}>
                Welcome, {currentUser.username}!
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/boards">
                Boards
              </Button>
              <Button color="inherit" component={Link} to="/new-board">
                Create Board
              </Button>
              <Button color="inherit" onClick={logout_user}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
