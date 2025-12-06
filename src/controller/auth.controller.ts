import { ApiResponse } from "@/lib/api-response";
import { authService } from "@/services/auth.service";
import { SendVerification, PostVerification } from "@/types/auth";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Profile } from "passport-google-oauth20";

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

  async sendVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body as SendVerification["body"];
      const response = await authService.sendVerification(userId);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...response }, "Get verification"));
    } catch (error) {
      next(error);
    }
  }

  async postVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { code, userId, verificationId } = req.body as PostVerification["body"];
      const response = await authService.postVerification(userId, verificationId, code);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...response }, "Verify success"));
    } catch (error) {
      next(error);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await authService.googleAuth(req.user as Profile["_json"]);
      res.redirect(`http://localhost:5173/third-party?token=${response.token}`);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
