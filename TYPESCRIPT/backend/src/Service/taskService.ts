// services/taskService.ts
import pool from '../Model/Model';

const taskService = {
  getAllTasks: async () => {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
  },

  createTask: async (value: string) => {
    const { rows } = await pool.query('INSERT INTO tasks (value) VALUES ($1) RETURNING *', [value]);
    return rows[0];
  },

  updateTask: async (id: string, completed: boolean) => {
    const { rows } = await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
    return rows[0];
  },

  deleteTask: async (id: string) => {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  },
};

export default taskService;
