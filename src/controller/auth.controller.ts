import { ApiResponse } from "@/lib/api-response";
import { authService } from "@/services/auth.service";
import { GetVerification, PostVerification } from "@/types/auth";
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
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...response }, "Sign in successful"));
    } catch (error) {
      next(error);
    }
  }

  async getVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query as GetVerification["query"];
      const response = await authService.getVerification(userId);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...response }, "Get verification"));
    } catch (error) {
      next(error);
    }
  }

  async postVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, verificationId } = req.query as PostVerification["query"];
      const { code } = req.body as PostVerification["body"];
      const response = await authService.postVerification(userId, verificationId, code);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...response }, "Verify success"));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
