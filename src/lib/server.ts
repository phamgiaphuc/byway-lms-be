import { Server } from "node:http";
import logger from "@/lib/logger";
import { env } from "@/lib/env";

export function handleShutdown(server: Server, signal: NodeJS.Signals) {
  if (env.NODE_ENV === "development") return;
  logger.warn(`Received ${signal}, starting graceful shutdown...`);

  if (!server.listening) {
    logger.warn("Server is not listening — exiting immediately.");
    process.exit(0);
  }

  server.close((err) => {
    if (err) {
      logger.error(`Error while closing server: ${err.message}`);
      process.exit(1);
    } else {
      logger.info("✅ Server closed successfully. Exiting.");
      process.exit(0);
    }
  });
}
