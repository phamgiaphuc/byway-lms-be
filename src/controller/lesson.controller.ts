import { ApiResponse } from "@/lib/api-response";
import { lessonService } from "@/services/lesson.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class LessonController {
  async getLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.query;
      const lessons = await lessonService.getLessons(courseId as string);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, lessons, "Get lessons successful"));
    } catch (error) {
      next(error);
    }
  }

  async getLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const { lessonId } = req.params;
      const lesson = await lessonService.getLessonById(lessonId);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, lesson, "Get lesson successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const lessonController = new LessonController();
