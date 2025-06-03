import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, updateTask, taskToEdit }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(""); // To store validation error messages

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if both fields are filled
    if (!taskName || !taskDescription) {
      setError("Both task name and description are required!");
      return; // Stop form submission if fields are empty
    }

    // Clear error if validation is successful
    setError("");

    const newTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      name: taskName,
      description: taskDescription,
      completed: false,
    };

    if (taskToEdit) {
      updateTask(newTask); // Update the task if editing
    } else {
      addTask(newTask); // Add new task
    }

    setTaskName("");
    setTaskDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error if validation fails */}
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
