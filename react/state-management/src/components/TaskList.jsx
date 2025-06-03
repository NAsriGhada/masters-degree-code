import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, deleteTask, toggleCompletion, handleEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompletion={toggleCompletion}
          handleEdit={handleEdit} // Pass the handleEdit function to TaskItem
        />
      ))}
    </div>
  );
};

export default TaskList;
