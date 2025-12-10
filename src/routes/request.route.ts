import { requestController } from "@/controller/request.controller";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { schemaValidation } from "@/middleware/validation.middleware";
import { createTeachRequestSchema } from "@/types/request";
import { requestRoute } from "@/types/routes/request.route";
import { Router } from "express";

const router = Router();

router.get(requestRoute.getRequests, jwtMiddleware(), requestController.getRequests);

router.post(
  requestRoute.createTeachRequest,
  jwtMiddleware(),
  schemaValidation(createTeachRequestSchema),
  requestController.createTeachRequest,
);

export const requestRoutes = router;
