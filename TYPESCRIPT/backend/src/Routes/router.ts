import { Router } from "express";
import {
  completeTask,
  createTask,
  deleteAllTask,
  deleteTask,
  getAllTasks,
  getCompletedTask,
  getRemainingTask,
  remainingTask,
  updateTask,
} from "../Controller/taskController";
import { createUser, userLogin, verifyUser } from "../Controller/users";

const router = Router();
router.route("/tasks").post(createTask).get(getAllTasks).delete(deleteAllTask);
router.route("/remainingTask").get(getRemainingTask);
router.route("/completedTask").get(getCompletedTask);
router.route("/user").post(createUser);
router.route("/verify").patch(verifyUser);
router.route("/login").post(userLogin);
router.route("/remainingTask/:id").patch(completeTask);
router.route("/tasks/:id").put(updateTask).delete(deleteTask);
router.route("/completedTask/:id").get(remainingTask);

export default router;
