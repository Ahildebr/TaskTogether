import React, { useState} from "react";


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
    if (onUpdate) onUpdate(updated); // ✅ Send update to parent
    if (onClose) onClose(); // ✅ Close the form
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <label>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default BoardEditForm;