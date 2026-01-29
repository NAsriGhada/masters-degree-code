import mongoose from "mongoose";
import { Task } from "../models/Task.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createTask = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  if (!title) return next(new AppError("TITLE_REQUIRED", 400));

  const task = await Task.create({
    title,
    user: req.user.id,
  });

  res.status(201).json({ status: "success", task });
});

export const getMyTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ status: "success", results: tasks.length, tasks });
});

export const deleteMyTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("INVALID_TASK_ID", 400));
  }

  // Ownership enforced here:
  const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

  if (!task) return next(new AppError("TASK_NOT_FOUND", 404));

  res.status(200).json({ status: "success", message: "Task deleted" });
});
