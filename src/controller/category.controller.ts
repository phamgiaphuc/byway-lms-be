import { ApiResponse } from "@/lib/api-response";
import { categoryService } from "@/services/category.service";
import {
  CreateCategorySchema,
  DeleteCategoriesSchema,
  GetCategoriesSchema,
  GetCategoryBySlugSchema,
  UpdateCategoryByIdSchema,
} from "@/types/category";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as GetCategoriesSchema["query"];
      const categories = await categoryService.getCategories(query);
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

  async updateCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params as UpdateCategoryByIdSchema["params"];
      const body = req.body as UpdateCategoryByIdSchema["body"];
      const category = await categoryService.updateCategoryById(params.id, body);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...category }, "Update category successful"));
    } catch (error) {
      next(error);
    }
  }

  async deleteCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as DeleteCategoriesSchema["body"];
      await categoryService.deleteCategories(body.ids);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, {}, "Delete category successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();
