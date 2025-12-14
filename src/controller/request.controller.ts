import { ApiResponse } from "@/lib/api-response";
import { requestService } from "@/services/request.service";
import { UserPayload } from "@/types/auth";
import { CreateTeachRequestSchema, RoleRequestSchema } from "@/types/request";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class RequestController {
  async getRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserPayload;
      const requests = await requestService.getRequests(user);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, requests, "Get requests successful"));
    } catch (error) {
      next(error);
    }
  }

  async createTeachRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserPayload;
      const { agree } = req.body as CreateTeachRequestSchema["body"];
      const response = await requestService.createTeachRequest(user, agree);
      res
        .status(StatusCodes.OK)
        .json(new ApiResponse(StatusCodes.OK, { ...response }, "Submit teach request successful"));
    } catch (error) {
      next(error);
    }
  }

  async updateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const requestId = req.params.id;
      const payload = req.body as RoleRequestSchema["body"];
      const result = await requestService.updateRequest(requestId, payload);
      res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, result, "Request processed successfully"));
    } catch (error) {
      next(error);
    }
  }
}

export const requestController = new RequestController();
