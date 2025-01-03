import express from "express";
import type {Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8080;

app.get("/allTodos", (req: Request, res: Response) => {
    return res.send("Todo");
})

app.listen(PORT, () => console.log("server is running"));
console.log(`http://localhost:${PORT}/allTodos`);