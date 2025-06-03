import React from "react";

const TaskItem = ({ task, deleteTask, toggleCompletion, handleEdit }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };

  const handleToggleCompletion = () => {
    toggleCompletion(task.id);
  };

  return (
    <div style={{ textDecoration: task.completed ? "line-through red" : "none" }} className="task">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button onClick={() => handleEdit(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleToggleCompletion}>
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </div>
  );
};

export default TaskItem;
