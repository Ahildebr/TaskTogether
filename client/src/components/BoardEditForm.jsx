import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

const BoardEditForm = ({ board, onClose, onUpdate }) => {
  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://127.0.0.1:5555/api/boards/${board.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    const updated = await res.json();
    if (onUpdate) onUpdate(updated);
    if (onClose) onClose();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Edit Board
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BoardEditForm;
