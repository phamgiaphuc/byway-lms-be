import { ApiResponse } from "@/lib/api-response";
import { categoryService } from "@/services/category.service";
import { CreateCategorySchema, GetCategoryBySlugSchema } from "@/types/category";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getCategories();
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.CREATED, categories, "Get categories successful"));
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreateCategorySchema["body"];
      const category = await categoryService.createCategory(body);
      res
        .status(StatusCodes.CREATED)
        .json(new ApiResponse(StatusCodes.CREATED, { ...category }, "Create category successful"));
    } catch (error) {
      next(error);
    }
  }

  async getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params as GetCategoryBySlugSchema["params"];
      const category = await categoryService.getCategoryBySlug(params.slug);
      res
        .status(StatusCodes.OK)
        .json(new ApiResponse(StatusCodes.OK, { ...category }, "Get category by slug successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();
