import express,{Request,Response} from "express";
import config from "./config";
import routes from "./routes"
const app = express();
app.use(express.json());
app.use(routes)

console.log(`server listioning on port: ${
    config.serverPort
}`);
app.listen(config.serverPort)