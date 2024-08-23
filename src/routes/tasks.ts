import { Router, Request, Response } from "express";
import { TaskService } from "../services/task-service";
import { MikroORM } from "@mikro-orm/core";

const router = Router();

export const taskRoutes = (orm: MikroORM) => {
  const em = orm.em.fork();
  const taskServices = new TaskService(em);

  router.get("/", async (req: Request, res: Response) => {
    const tasks = await taskServices.getAllTasks();

    res.json(tasks);
  });

  router.post("/", async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const task = await taskServices.createTask(title, description);
    res.status(201).json(task);
  });

  return router;
};
