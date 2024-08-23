import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { connectDatabase } from "./database/connection";
import { createRoutes } from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

connectDatabase()
  .then((orm) => {

    app.use('api', createRoutes(orm));

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });
