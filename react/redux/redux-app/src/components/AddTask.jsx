import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/features/TaskSlice";

const AddTask = () => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      dispatch(addTask(description));
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
