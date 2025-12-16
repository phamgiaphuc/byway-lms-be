import { ApiResponse } from "@/lib/api-response";
import { instructorService } from "@/services/instructor.service";
import { UserPayload } from "@/types/auth";
import { CreateChapterSchema, GetChaptersSchema, UpdateChapterSchema } from "@/types/chapter";
import { GetCourseByIdSchema } from "@/types/course";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class InstructorController {
  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserPayload;
      const courses = await instructorService.getCourses(user);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, courses, "Get courses successful"));
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserPayload;
      const { id } = req.params as GetCourseByIdSchema["params"];
      const course = await instructorService.getCourseById(user, id);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...course }, "Get course successful"));
    } catch (error) {
      next(error);
    }
  }

  async createChapter(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreateChapterSchema["body"];
      const chapter = await instructorService.createChapter(body);
      res
        .status(StatusCodes.CREATED)
        .json(new ApiResponse(StatusCodes.OK, { ...chapter }, "Create chapter successful"));
    } catch (error) {
      next(error);
    }
  }

  async getChapters(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as GetChaptersSchema["query"];
      const chapters = await instructorService.getChapters(query);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, chapters, "Get chapters successful"));
    } catch (error) {
      next(error);
    }
  }

  async updateChapterById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserPayload;
      const params = req.params as UpdateChapterSchema["params"];
      const body = req.body as UpdateChapterSchema["body"];
      const chapter = await instructorService.updateChapterById(user, params.id, body);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...chapter }, "Update chapter successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const instructorController = new InstructorController();
