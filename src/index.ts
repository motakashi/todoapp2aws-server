import express from "express";
import type {Express, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const app: Express = express();
const PORT = 8080;

app.use(express.json());
const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany()
    return res.json(allTodos);
});

app.post("/createTodo", async(req: Request, res: Response) => {
    try {
        console.log(req.body);
        const {title, isCompleted} = req.body;
        const createTodo = await prisma.todo.create({
            data: {
              title,
              isCompleted
            },
          })
          return res.json(createTodo)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while creating a todo." });
    }
});

app.put("/editTodo/:id", async(req: Request, res: Response) =>  {
    try {
        const id = Number(req.params.id);
        console.log(id);
        console.log(req.body);
        const {title, isCompleted} = req.body;
        const editTodo = await prisma.todo.update({
            where: {id},
            data: {
              title,
              isCompleted
            },
          })
          return res.json(editTodo)
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

app.listen(PORT, () => console.log("server is running"));
console.log(`http://localhost:${PORT}/allTodos`);
console.log(`http://localhost:${PORT}/createTodo`);
console.log(`http://localhost:${PORT}/editTodo`);