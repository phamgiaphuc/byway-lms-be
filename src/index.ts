import { env } from "@/lib/env";
import logger from "@/lib/logger";
import { swaggerDocs } from "@/lib/swagger";
import { enableAppMiddleware } from "@/middleware/server.middleware";
import { apis } from "@/routes";
import { apiRoute } from "@/types/routes/route";
import express from "express";
import * as swaggerUi from "swagger-ui-express";

const server = express();

enableAppMiddleware(server);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(apiRoute.index, apis);

const startServer = async () => {
  server.listen(env.PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${env.PORT}`);
  });
};
startServer();

export default server;
