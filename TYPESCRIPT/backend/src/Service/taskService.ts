// import pool from "../Model/Model";
// export const createTaskService = async (task: string) => {
//   return pool.query("INSERT INTO tasks (task) VALUES ($1) RETURNING *", [task]);
// };

// export const getAllTasksService = async () => {
//   return pool.query("SELECT * FROM tasks");
// };

// export const updateTaskService = async (taskid: string, task: string) => {
//   return pool.query(
//     "UPDATE tasks SET task = $1 WHERE taskid = $2 RETURNING *",
//     [task, taskid]
//   );
// };

// export const deleteTaskService = async (taskid: string) => {
//   return pool.query("DELETE FROM tasks WHERE taskid = $1", [taskid]);
// };

// export const deleteAllTaskService = async () => {
//   return pool.query("DELETE FROM tasks RETURNING *");
// };

// export const getRemainingTaskService = async () => {
//   return pool.query("SELECT * FROM tasks WHERE Status = false");
// };

// export const getCompletedTaskService = async () => {
//   return pool.query("SELECT * FROM tasks WHERE Status = True");
// };

// export const completeTaskService = async (taskid: string): Promise<any> => {
//   return pool.query(
//     "UPDATE tasks SET status = $1 WHERE taskid = $2 RETURNING *",
//     ["true", taskid]
//   );
// };

// export const remainingTaskService = async (taskid: string) => {
//   return pool.query(
//     "UPDATE tasks SET status = $1 WHERE taskid = $2 RETURNING *",
//     ["false", taskid]
//   );
// };
