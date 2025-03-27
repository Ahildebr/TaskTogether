import React, { useState, useContext } from "react";
import { BoardsContext } from "../context/BoardsContext";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from "@mui/material";

const NewBoardForm = () => {
  const { createBoard } = useContext(BoardsContext);
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
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to create board.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
      What are we trying to keep track of today?🧐
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter board title"
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter board description"
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Board"}
        </Button>
      </Box>
    </Paper>
  );
};

export default NewBoardForm;
