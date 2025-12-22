import { ApiResponse } from "@/lib/api-response";
import { courseService } from "@/services/course.service";
import { UserPayload } from "@/types/auth";
import { CreateCourseSchema, getCourseByIdSchema, getCoursesSchema, UpdateCourseByIdSchema } from "@/types/course";
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

  async updateCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as UpdateCourseByIdSchema["body"];
      const { id } = req.params as UpdateCourseByIdSchema["params"];
      const course = await courseService.updateCourseById(body, id);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...course }, "Update course successful"));
    } catch (error) {
      next(error);
    }
  }

  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = getCoursesSchema.parse({
        query: req.query,
      });
      const courses = await courseService.getCourses(query);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, courses, "Get courses successful"));
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = getCourseByIdSchema.parse({
        params: req.params,
        query: req.query,
      });
      const course = await courseService.getCourseById(parsed.params, parsed.query);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, course, "Get course successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const courseController = new CourseController();
