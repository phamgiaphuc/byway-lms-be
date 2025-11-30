import { ApiResponse } from "@/lib/api-response";
import { authService } from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.signUp(req.body);
      res.status(StatusCodes.CREATED).json(new ApiResponse(StatusCodes.CREATED, { user: user }, "Sign up successful"));
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.signIn(req.body);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, result, "Sign in successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
