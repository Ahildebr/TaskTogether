import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TasksContext";

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
    closeForm(); // ✅ Close the form after saving
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Task</h3>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
};

export default EditTaskForm;
