import React, { useState } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const ListTask = () => {
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("all"); // 'all' | 'done' | 'not'

  const filtered = tasks.filter((task) => {
    if (filter === "done") return task.isDone;
    if (filter === "not") return !task.isDone;
    return true;
  });

  return (
    <div>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("done")}>Done</button>
        <button onClick={() => setFilter("not")}>Not Done</button>
      </div>

      {filtered.length > 0 ? (
        filtered.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default ListTask;
