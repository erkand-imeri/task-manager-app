import { Router } from "express";
import { taskRoutes } from "./tasks";
import { MikroORM } from "@mikro-orm/core";

export const createRoutes = (orm: MikroORM) => {
  const router = Router();

  router.use("/tasks", taskRoutes(orm));

  return router;
};
