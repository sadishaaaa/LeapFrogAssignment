// services/taskService.ts
import pool from "../Model/Model";

const taskService = {
  createTask: async (value: string) => {
    const { rows } = await pool.query(
      "INSERT INTO tasks (task)VALUES ($1)RETURNING *",
      [value]
    );
    return rows[0];
  },
};

export default taskService;
