import { env } from "@/lib/env";
import logger from "@/lib/logger";
import { enableAppMiddleware } from "@/middleware/server.middleware";
import express, { Request, Response } from "express";

const server = express();

enableAppMiddleware(server);

server.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

const startServer = async () => {
  server.listen(env.PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${env.PORT}`);
  });
};
startServer();

export default server;
