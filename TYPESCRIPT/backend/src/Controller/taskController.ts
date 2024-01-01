import { Request, Response } from "express";
import taskService from "../Service/taskService";
import pool from "../Model/Model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (task) VALUES ($1) RETURNING *",
      [task]
    );
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
    const result = await pool.query("SELECT * FROM tasks");
    if (result.rows.length === 0) {
      res.json({message:"No task available"});
    }
    else{
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
    const result = await pool.query(
      "UPDATE tasks SET task = $1  WHERE taskid = $2 RETURNING *",
      [task, taskid]
    );
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
    const result = await pool.query(
      "Delete FROM tasks WHERE taskid = $1 RETURNING *",
      [taskid]
    );
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
    const result = await pool.query("DELETE FROM tasks RETURNING *");
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
