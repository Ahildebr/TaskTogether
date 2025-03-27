import React, { useContext } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BoardsContext } from "../context/BoardsContext";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { boards } = useContext(BoardsContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewBoard = (id) => {
    navigate(`/boards/${id}`);
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 6,
          maxWidth: 600,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {currentUser?.username || "friend"}!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Ready to get organized? Create a new board or jump into an existing one.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/new-board")}>
          Create New Board
        </Button>
      </Paper>

      {boards.length > 0 ? (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Your Boards
          </Typography>
          <Grid container spacing={3}>
            {boards.map((board) => (
              <Grid item key={board.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {board.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {board.description || "No description provided."}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleViewBoard(board.id)}>
                      View Board
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="body1" align="center">
          You don’t have any boards yet. Create one to get started!
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
