import { ApiResponse } from "@/lib/api-response";
import { courseService } from "@/services/course.service";
import { UserPayload } from "@/types/auth";
import { CreateCourseSchema } from "@/types/course";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class CourseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreateCourseSchema["body"];
      const user = req.user as UserPayload;
      const course = await courseService.createCourse(body, user.id);
      res
        .status(StatusCodes.CREATED)
        .json(new ApiResponse(StatusCodes.CREATED, { ...course }, "Create course successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const courseController = new CourseController();
