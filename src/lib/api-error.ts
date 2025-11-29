/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from "@/lib/env";
import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errors: any[];

  constructor(statusCode: number, message: string = "something went wrong", errors: any[] = [], stack: string = "") {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack && env.NODE_ENV === "development") {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request", errors: any[] = []) {
    super(StatusCodes.BAD_REQUEST, message, errors);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized request", errors: any[] = []) {
    super(StatusCodes.UNAUTHORIZED, message, errors);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Access forbidden", errors: any[] = []) {
    super(StatusCodes.FORBIDDEN, message, errors);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found", errors: any[] = []) {
    super(StatusCodes.NOT_FOUND, message, errors);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Resource conflict", errors: any[] = []) {
    super(StatusCodes.CONFLICT, message, errors);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message = "Too many requests", errors: any[] = []) {
    super(StatusCodes.TOO_MANY_REQUESTS, message, errors);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "Internal server error", errors: any[] = []) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, errors);
  }
}
