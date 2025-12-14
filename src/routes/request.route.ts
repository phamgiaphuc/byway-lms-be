import { ADMIN_ROLE } from "@/constants/role";
import { requestController } from "@/controller/request.controller";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { schemaValidation } from "@/middleware/validation.middleware";
import { createTeachRequestSchema, roleRequestSchema } from "@/types/request";
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

router.put(
  requestRoute.updateRequestById,
  jwtMiddleware(),
  roleMiddleware([ADMIN_ROLE]),
  schemaValidation(roleRequestSchema),
  requestController.updateRequest,
);

export const requestRoutes = router;
