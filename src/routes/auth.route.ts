import { ApiResponse } from "@/lib/api-response";
import { schemaValidation } from "@/middleware/validation.middleware";
import { SignInBody, signInSchema } from "@/types/auth";
import { authRoute } from "@/types/routes/auth.route";
import { Request, Router, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(authRoute.status, (_: Request, res: Response) => {
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, {}, "auth status"));
});

router.post(authRoute.signIn, schemaValidation(signInSchema), (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(new ApiResponse<SignInBody>(StatusCodes.OK, req.body, "Sign in successful"));
});

export const authRoutes = router;
