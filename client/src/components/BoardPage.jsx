import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../context/TasksContext";
import NewTaskForm from "./NewTaskForm";
import EditTaskForm from "./EditTaskForm";
import BoardEditForm from "./BoardEditForm";


const BoardPage = () => {
  const { board_id } = useParams();
  const { tasks, fetchTasks, deleteTask } = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState(null);
  const [board, setBoard] = useState(null);
  const [editingBoard, setEditingBoard] = useState(false);


  useEffect(() => {
    fetchTasks(board_id),
    fetchBoardDetails()
  }, [board_id]);

  const fetchBoardDetails = async () => {
    const res = await fetch(`http://127.0.0.1:5555/api/boards/${board_id}`, {
      credentials: "include",
    });
    const data = await res.json();
    setBoard(data);
  };

  return (
    <div>
      <h2>Tasks for Board {board_id}</h2>
      {board && (
        <div>
          <h2>{board.title}</h2>
          <p>{board.description}</p>
          <button onClick={() => setEditingBoard(true)}>Edit Board</button>
          {editingBoard && (
          <BoardEditForm
            board={board}
            onClose={() => setEditingBoard(false)}
            onUpdate={(updatedBoard) => setBoard(updatedBoard)}
          />
        )}
        </div>
      )}
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
