import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TasksContext";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const NewTaskForm = ({ board_id }) => {
  const { createTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    await createTask(title, description, status, board_id);
    setTitle("");
    setDescription("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Create New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="normal"
        >
          {["To Do", "In Progress", "Completed"].map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default NewTaskForm;
