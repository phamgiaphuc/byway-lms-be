import { ApiResponse } from "@/lib/api-response";
import { authService } from "@/services/auth.service";
import { GetVerificationQuery } from "@/types/auth";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await authService.signUp(req.body);
      res.status(StatusCodes.CREATED).json(new ApiResponse(StatusCodes.CREATED, { ...response }, "Sign up successful"));
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await authService.signIn(req.body);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, response, "Sign in successful"));
    } catch (error) {
      next(error);
    }
  }

  async getVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query as GetVerificationQuery;
      const response = await authService.getVerification(userId);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, response, "Get verification"));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export const authController = new AuthController();
