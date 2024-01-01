import { Router } from "express";
import { createTask, deleteAllTask, deleteTask, getAllTasks, updateTask } from "../Controller/taskController";

const router = Router();
router.route("/tasks").post(createTask).get(getAllTasks).delete(deleteAllTask);
router.route("/tasks/:id").put(updateTask).delete(deleteTask);


export default router;
