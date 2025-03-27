import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../context/TasksContext";
import { BoardsContext } from "../context/BoardsContext";
import NewTaskForm from "./NewTaskForm";
import EditTaskForm from "./EditTaskForm";
import BoardEditForm from "./BoardEditForm";

import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BoardPage = () => {
  const { board_id } = useParams();
  const { tasks, fetchTasks, deleteTask } = useContext(TaskContext);
  const { inviteUserToBoard } = useContext(BoardsContext);

  const [editingTask, setEditingTask] = useState(null);
  const [board, setBoard] = useState(null);
  const [editingBoard, setEditingBoard] = useState(false);

  const [inviteUsername, setInviteUsername] = useState("");
  const [inviteMessage, setInviteMessage] = useState(null);

  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const toggleExpand = (id) =>
    setExpandedTaskId((prev) => (prev === id ? null : id));

  useEffect(() => {
    fetchTasks(board_id);
    fetchBoardDetails();
  }, [board_id]);

  const fetchBoardDetails = async () => {
    const res = await fetch(`http://127.0.0.1:5555/api/boards/${board_id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setBoard(data);
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    const result = await inviteUserToBoard(board.id, inviteUsername);
    if (result.success) {
      setInviteMessage(`${inviteUsername} added to board!`);
      setInviteUsername("");
    } else {
      setInviteMessage(`${result.error}`);
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 6,
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      {board && (
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {board.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {board.description}
          </Typography>

          <Button
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => setEditingBoard(true)}
          >
            Edit Board
          </Button>

          {editingBoard && (
            <BoardEditForm
              board={board}
              onClose={() => setEditingBoard(false)}
              onUpdate={(updatedBoard) => setBoard(updatedBoard)}
            />
          )}

          <Box
            component="form"
            onSubmit={handleInvite}
            sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
          >
            <TextField
              label="Invite user by username"
              variant="outlined"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              size="small"
            />
            <Button variant="contained" type="submit">
              Invite
            </Button>
          </Box>

          {inviteMessage && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {inviteMessage}
            </Alert>
          )}
        </Paper>
      )}

      <NewTaskForm board_id={board_id} />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Existing Tasks
      </Typography>

      {tasks.length > 0 ? (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              {editingTask === task.id ? (
                <EditTaskForm
                  task={task}
                  closeForm={() => setEditingTask(null)}
                />
              ) : (
                <Card>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography color="text.secondary">
                      {task.status}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Box>
                      <Button size="small" onClick={() => setEditingTask(task.id)}>
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                    <IconButton
                      onClick={() => toggleExpand(task.id)}
                      sx={{
                        transform:
                          expandedTaskId === task.id
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedTaskId === task.id} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="body1">
                        {task.description}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No tasks yet.</Typography>
      )}
    </Box>
  );
};

export default BoardPage;
