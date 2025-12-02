import { BadRequestError, InternalServerError } from "@/lib/api-error";
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const schemaValidation = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const { issues } = error;
      const errors = issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return next(new BadRequestError("Validation error", errors));
    }
    return next(new InternalServerError("Internal server error", [error]));
  }
};
