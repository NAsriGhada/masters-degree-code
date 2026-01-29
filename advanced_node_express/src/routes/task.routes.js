import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTask,
  getMyTasks,
  deleteMyTask,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.use(verifyToken);

taskRouter.post("/", createTask);
taskRouter.get("/", getMyTasks);
taskRouter.delete("/:id", deleteMyTask);
