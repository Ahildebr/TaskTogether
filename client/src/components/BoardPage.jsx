import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../context/TasksContext";
import NewTaskForm from "./NewTaskForm";
import EditTaskForm from "./EditTaskForm";

const BoardPage = () => {
  const { board_id } = useParams();
  const { tasks, fetchTasks, deleteTask } = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks(board_id);
  }, [board_id]);

  return (
    <div>
      <h2>Tasks for Board {board_id}</h2>
      <NewTaskForm board_id={board_id} />

      <h3>Existing Tasks</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              {editingTask === task.id ? (
                <EditTaskForm task={task} closeForm={() => setEditingTask(null)} />
              ) : (
                <>
                  <strong>{task.title}</strong> - {task.status}
                  <button onClick={() => setEditingTask(task.id)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No tasks yet.</p>
        )}
      </ul>
    </div>
  );
};

export default BoardPage;
