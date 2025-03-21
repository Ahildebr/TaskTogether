import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TasksContext";

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTaskForm;
