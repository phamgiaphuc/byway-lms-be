import compression from "compression";
import express, { Express } from "express";
import cors from "cors";

export const enableAppMiddleware = (server: Express) => {
  server.use(express.json());
  server.use("/", express.static("public"));
  server.use(compression());
  server.use(
    cors({
      origin: "*",
    }),
  );
};
