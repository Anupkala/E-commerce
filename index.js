import express from "express";
import routes from "./routes/routes.js";
import bodyParser from "body-parser";

const app=express();
const port=process.env.port || 6969;

app.use(bodyParser.json());

app.use("/api",routes);

app.listen(port,async() =>{
console.log(`Server started on port ${port}`);
});