import {Pool} from "pg"

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ToDoList",
  password: "S@di2059",
  port: 5432,
});
pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });

export default pool;
