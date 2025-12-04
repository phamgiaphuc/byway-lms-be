import compression from "compression";
import express, { Express } from "express";
import cors from "cors";
import passport from "@/lib/passport";

export const enableAppMiddleware = (server: Express) => {
  server.use(express.json());
  server.use("/", express.static("public"));
  server.use(compression());
  server.use(
    cors({
      origin: "*",
    }),
  );
  server.use(passport.initialize());
};
