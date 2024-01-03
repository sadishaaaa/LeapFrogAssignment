import { Request, Response } from "express";
import {
  completeTaskModel,
  createTaskModel,
  deleteAllTaskModel,
  deleteTaskModel,
  getAllTasksModel,
  getCompletedTaskModel,
  getRemainingTaskModel,
  remainingTaskModel,
  updateTaskModel,
} from "../Model/taskModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const result = await createTaskModel(task);
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
    const result = await getAllTasksModel();
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
    const result = await updateTaskModel(taskid, task);
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
    const result = await deleteTaskModel(taskid);
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
    const result = await deleteAllTaskModel();
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
    const result = await getRemainingTaskModel();
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
    const result = await getCompletedTaskModel();
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

    const result = await completeTaskModel(taskid);
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

    const result = await remainingTaskModel(taskid);
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
