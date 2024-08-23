import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

export const connectDatabase = async () => {
  const orm = await MikroORM.init(config);
  console.log("Database was connected successfully.");
  return orm;
};
