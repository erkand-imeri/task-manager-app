import dotenv from "dotenv";

dotenv.config();

import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Task Manager App!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
