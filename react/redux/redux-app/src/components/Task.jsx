import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, editTask } from "../redux/features/TaskSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newDesc, setNewDesc] = useState(task.description);

  const handleEdit = () => {
    if (isEditing && newDesc !== task.description) {
      dispatch(editTask({ id: task.id, description: newDesc }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      {isEditing ? (
        <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
      ) : (
        <span style={{ textDecoration: task.isDone ? "line-through" : "none" }}>
          {task.description}
        </span>
      )}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </div>
  );
};

export default Task;
