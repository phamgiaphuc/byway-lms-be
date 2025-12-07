import { BadRequestError } from "@/lib/api-error";
import { ApiResponse } from "@/lib/api-response";
import { fileService } from "@/services/file.service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class FileController {
  async uploadSingle(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file as Express.Multer.File;
      if (!file) {
        throw new BadRequestError("No file uploaded");
      }
      const response = fileService.uploadFile(file, req.body?.folder);

      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { ...response }, "Upload file successful"));
    } catch (error) {
      next(error);
    }
  }

  async uploadMultiple(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        throw new BadRequestError("No files uploaded");
      }

      const folder = req.body?.folder;
      const results = [];

      for (const file of files) {
        const uploaded = await fileService.uploadFile(file, folder);
        results.push(uploaded);
      }

      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, results, "Upload multiple files successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const fileController = new FileController();
