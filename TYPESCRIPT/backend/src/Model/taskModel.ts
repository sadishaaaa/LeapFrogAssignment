import pool from "./Model";
export const createTaskModel = async (task: string) => {
  return pool.query("INSERT INTO tasks (task) VALUES ($1) RETURNING *", [task]);
};

export const getAllTasksModel = async () => {
  return pool.query("SELECT * FROM tasks");
};

export const updateTaskModel = async (taskid: string, task: string) => {
  return pool.query(
    "UPDATE tasks SET task = $1 WHERE taskid = $2 RETURNING *",
    [task, taskid]
  );
};

export const deleteTaskModel = async (taskid: string) => {
  return pool.query("DELETE FROM tasks WHERE taskid = $1", [taskid]);
};

export const deleteAllTaskModel = async () => {
  return pool.query("DELETE FROM tasks RETURNING *");
};

export const getRemainingTaskModel = async () => {
  return pool.query("SELECT * FROM tasks WHERE Status = false");
};

export const getCompletedTaskModel = async () => {
  return pool.query("SELECT * FROM tasks WHERE Status = True");
};

export const completeTaskModel = async (taskid: string): Promise<any> => {
  return pool.query(
    "UPDATE tasks SET status = $1 WHERE taskid = $2 RETURNING *",
    ["true", taskid]
  );
};

export const remainingTaskModel = async (taskid: string) => {
  return pool.query(
    "UPDATE tasks SET status = $1 WHERE taskid = $2 RETURNING *",
    ["false", taskid]
  );
};
