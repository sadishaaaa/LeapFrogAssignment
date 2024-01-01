import { Request, Response } from "express";
import {
  completeTaskService,
  createTaskService,
  deleteAllTaskService,
  deleteTaskService,
  getAllTasksService,
  getCompletedTaskService,
  getRemainingTaskService,
  remainingTaskService,
  updateTaskService,
} from "../Service/taskService";
import pool from "../Model/Model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const result = await createTaskService(task);
    res.json({
      success: true,
      message: "Task added",
      data: result.rows[0],
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error adding task",
    });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const result = await getAllTasksService();
    if (result.rows.length === 0) {
      res.json({ message: "No task available" });
    } else {
      res.json({
        success: true,
        count: result.rowCount,
        data: result.rows,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error getting all tasks",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskid = req.params.id;
    const { task } = req.body;
    const result = await updateTaskService(taskid, task);
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error getting all tasks",
    });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskid = req.params.id;
    const result = await deleteTaskService(taskid);
    res.json({
      success: true,
      message: "sucessfully deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Delete failed",
    });
  }
};
export const deleteAllTask = async (req: Request, res: Response) => {
  try {
    const result = await deleteAllTaskService();
    res.json({
      success: true,
      message: "sucessfully deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Delete failed",
    });
  }
};

export const getRemainingTask = async (req: Request, res: Response) => {
  try {
    const result = await getRemainingTaskService();
    res.json({
      success: true,
      message: "Sucessful",
      data: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed",
    });
  }
};
export const getCompletedTask = async (req: Request, res: Response) => {
  try {
    const result = await getCompletedTaskService();
    res.json({
      success: true,
      message: "Sucessful",
      data: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed",
    });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const taskid = req.params.id;

    const result = await completeTaskService(taskid);
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error getting all tasks",
    });
  }
};
export const remainingTask = async (req: Request, res: Response) => {
  try {
    const taskid = req.params.id;

    const result = await remainingTaskService(taskid);
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error getting all tasks",
    });
  }
};
