import compression from "compression";
import express, { Express } from "express";

export const enableAppMiddleware = (server: Express) => {
  server.use(express.json());
  server.use("/", express.static("public"));
  server.use(compression());
};
