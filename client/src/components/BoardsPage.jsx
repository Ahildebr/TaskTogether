import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BoardsContext } from "../context/BoardsContext";
import { AuthContext } from "../context/AuthContext";
import BoardEditForm from "./BoardEditForm";

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
} from "@mui/material";

function BoardsPage() {
  const {
    boards,
    fetchBoards,
    createBoard,
    updateBoard,
    deleteBoard,
  } = useContext(BoardsContext);
  const { loggedin } = useContext(AuthContext);

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
    <Box sx={{ px: 4, py: 6, minHeight: "100vh", backgroundColor: "background.default" }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Boards
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 5, maxWidth: 600, mx: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" mb={2}>
            Create a New Board
          </Typography>
          <TextField
            fullWidth
            label="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Board Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Create Board
          </Button>
        </form>
      </Paper>

      {boards.length > 0 ? (
        <Grid container spacing={3}>
          {boards.map((board) => (
            <Grid item xs={12} sm={6} md={4} key={board.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {board.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {board.description || "No description provided."}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/boards/${board.id}`}>
                    View
                  </Button>
                  <Button size="small" onClick={() => setEditingBoard(board)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(board.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" mt={4}>
          No boards found.
        </Typography>
      )}

      {editingBoard && (
        <Box sx={{ mt: 4 }}>
          <BoardEditForm
            board={editingBoard}
            onUpdate={handleUpdate}
            onClose={() => setEditingBoard(null)}
          />
        </Box>
      )}
    </Box>
  );
}

export default BoardsPage;
