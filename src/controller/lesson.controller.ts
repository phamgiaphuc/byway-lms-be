import { NextFunction, Request, Response } from "express";

class LessonController {
  async getLessons(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export const lessonController = new LessonController();
