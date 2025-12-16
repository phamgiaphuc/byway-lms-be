import { courseController } from "@/controller/course.controller";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { schemaValidation } from "@/middleware/validation.middleware";
import { createCourseSchema } from "@/types/course";
import { courseRoute } from "@/types/routes/course.route";
import { Router } from "express";

const router = Router();

router.post(
  courseRoute.createCourse,
  jwtMiddleware(),
  roleMiddleware(["admin", "instructor"]),
  schemaValidation(createCourseSchema),
  courseController.createCourse,
);

export const courseRoutes = router;
