import {Pool} from "pg"

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ToDoList",
  password: "S@di2059",
  port: 8000,
});

export default pool;
