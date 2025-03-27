import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TasksContext";
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const EditTaskForm = ({ task, closeForm }) => {
  const { editTask } = useContext(TaskContext);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await editTask(task.id, { title, description, status });
    setLoading(false);
    closeForm();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Edit Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={closeForm}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditTaskForm;
