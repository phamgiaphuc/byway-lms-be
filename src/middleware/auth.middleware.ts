import { InternalServerError, UnauthorizedError } from "@/lib/api-error";
import { env } from "@/lib/env";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const jwtMiddleware = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new UnauthorizedError());
    }
    const user = jwt.verify(token, env.JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    return next(new InternalServerError("Internal server error", [error]));
  }
};
