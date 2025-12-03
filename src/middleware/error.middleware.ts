/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from "@/lib/api-error";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: "failed",
    message: err.message,
    errors: [],
  });
};
