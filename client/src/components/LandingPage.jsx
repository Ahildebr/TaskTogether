import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Container,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const LandingPage = () => {
  const { loggedin, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          TaskTogether
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={3}>
          TaskTogether is a real-time task collaboration app built to help you
          manage boards and stay on track with your team.
        </Typography>

        {loggedin ? (
          <>
            <Typography variant="h5" mb={2}>
              Welcome back, {currentUser.username}!
            </Typography>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/boards")}
              >
                View Boards
              </Button>
            </Stack>
          </>
        ) : (
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
          >
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default LandingPage;
