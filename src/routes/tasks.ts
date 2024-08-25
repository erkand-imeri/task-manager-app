import { Router, Request, Response } from "express";
import { TaskService } from "../services/task-service";
import { MikroORM } from "@mikro-orm/core";

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
    const task = await taskService.createTask(title, description);
    res.status(201).json(task);
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
      const updatedTask = await taskService.updateTask(
        parseInt(id, 10),
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
      await taskService.deleteTask(parseInt(id, 10));
      res.status(204).json({ message: `Task with id: ${id} successfully deleted`});
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task", error });
    }
  });

  return router;
};
