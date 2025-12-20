import { instructorController } from "@/controller/instructor.controller";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { schemaValidation } from "@/middleware/validation.middleware";
import {
  createChapterSchema,
  deleteChapterByIdSchema,
  getChapterByIdSchema,
  getChaptersSchema,
  updateChapterSchema,
} from "@/types/chapter";
import { getCourseByIdSchema } from "@/types/course";
import { createLessonSchema, deleteLessonByIdSchema } from "@/types/lesson";
import { instructorRoute } from "@/types/routes/instructor.route";
import { Router } from "express";

const router = Router();

router.use(jwtMiddleware(), roleMiddleware(["instructor"]));

router.get(instructorRoute.getCourses, instructorController.getCourses);

router.get(instructorRoute.getCourseById, schemaValidation(getCourseByIdSchema), instructorController.getCourseById);

router.post(instructorRoute.createChapter, schemaValidation(createChapterSchema), instructorController.createChapter);

router.get(instructorRoute.getChapterById, schemaValidation(getChapterByIdSchema), instructorController.getChapterById);

router.delete(
  instructorRoute.deleteChapterById,
  schemaValidation(deleteChapterByIdSchema),
  instructorController.deleteChapterById,
);

router.get(instructorRoute.getChapters, schemaValidation(getChaptersSchema), instructorController.getChapters);

router.post(instructorRoute.createLesson, schemaValidation(createLessonSchema), instructorController.createLesson);

router.put(
  instructorRoute.updateChapterById,
  schemaValidation(updateChapterSchema),
  instructorController.updateChapterById,
);

router.delete(
  instructorRoute.deleteLessonById,
  schemaValidation(deleteLessonByIdSchema),
  instructorController.deleteLessonById,
);

export const instructorRoutes = router;
