import { ApiResponse } from "@/lib/api-response";
import { userService } from "@/services/user.service";
import { UserPayload } from "@/types/auth";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class UserController {
  async getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as UserPayload;
      const response = await userService.getUserProfile(id);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...response }, "Get user profile"));
    } catch (error) {
      next(error);
    }
  }

  async enrollCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as UserPayload;
      const { courseId } = req.params;
      const userCourse = await userService.enrollCourse(id, courseId);
      res
        .status(StatusCodes.CREATED)
        .json(new ApiResponse(StatusCodes.CREATED, userCourse, "Enroll course successful"));
    } catch (error) {
      next(error);
    }
  }

  async getMyCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user as UserPayload;
      const courses = await userService.getMyCourses(userId);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, courses, "Get user courses successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
