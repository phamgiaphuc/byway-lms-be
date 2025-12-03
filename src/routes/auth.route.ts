import { authController } from "@/controller/auth.controller";
import { ApiResponse } from "@/lib/api-response";
import { schemaValidation } from "@/middleware/validation.middleware";
import { getVerificationSchema, postVerificationSchema, signInSchema, signUpSchema } from "@/types/auth";
import { authRoute } from "@/types/routes/auth.route";
import { Request, Router, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(authRoute.status, (_: Request, res: Response) => {
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, {}, "Auth status"));
});

router.post(authRoute.signIn, schemaValidation(signInSchema), authController.signIn);

router.post(authRoute.signUp, schemaValidation(signUpSchema), authController.signUp);

router.get(authRoute.verify, schemaValidation(getVerificationSchema), authController.getVerification);

router.post(authRoute.verify, schemaValidation(postVerificationSchema), authController.getVerification);

export const authRoutes = router;
