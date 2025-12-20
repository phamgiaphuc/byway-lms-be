import { courseController } from "@/controller/course.controller";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { schemaValidation } from "@/middleware/validation.middleware";
import { createCourseSchema, getCourseByIdSchema } from "@/types/course";
import { courseRoute } from "@/types/routes/course.route";
import { Router } from "express";

const router = Router();

router.get(courseRoute.getCourses, courseController.getCourses);

router.post(
  courseRoute.createCourse,
  jwtMiddleware(),
  roleMiddleware(["admin", "instructor"]),
  schemaValidation(createCourseSchema),
  courseController.createCourse,
);

router.get(courseRoute.getCourseById, schemaValidation(getCourseByIdSchema), courseController.getCourseById);

export const courseRoutes = router;
