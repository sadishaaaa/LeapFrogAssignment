import express, { Request, Response } from "express";
import config from "./config";
import router from "./Routes/router";
const app = express();
app.use(express.json());
app.use("/api", router);

console.log(`server listioning on port: ${config.serverPort}`);
app.listen(config.serverPort);
