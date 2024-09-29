import { Router, Request, Response } from "express";
import { TaskService } from "../services/task-service";
import { MikroORM } from "@mikro-orm/core";
import { User } from "../database/entities/User";

const router = Router();

export const taskRoutes = (orm: MikroORM) => {
  const em = orm.em.fork();
  const taskService = new TaskService(em);

  router.get("/", async (req: Request, res: Response) => {
    const tasks = await taskService.getAllTasks();

    res.json(tasks);
  });

  router.post("/", async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await taskService.createTask(title, description, user);
    res.status(201).json(task);
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
      const updatedTask = await taskService.updateTask(
        id,
        title,
        description,
        completed
      );

      if (!updatedTask)
        return res.status(404).json({ message: "Task not found" });

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task", error });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await taskService.deleteTask(id);
      res
        .status(204)
        .json({ message: `Task with id: ${id} successfully deleted` });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete the task", error });
    }
  });

  return router;
};
