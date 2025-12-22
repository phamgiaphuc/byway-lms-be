import { lessonController } from "@/controller/lesson.controller";
import { lessonRoute } from "@/types/routes/lesson.route";
import { Router } from "express";

const router = Router();

router.get(lessonRoute.getLessons, lessonController.getLessons);

router.get(lessonRoute.getLessonById, lessonController.getLessonById);

export const lessonRoutes = router;
