import { authRoutes } from "@/routes/auth.route";
import { categoryRoutes } from "@/routes/category.route";
import { courseRoutes } from "@/routes/course.route";
import { fileRoutes } from "@/routes/file.route";
import { instructorRoutes } from "@/routes/instructor.route";
import { lessonRoutes } from "@/routes/lesson.route";
import { requestRoutes } from "@/routes/request.route";
import { userRoutes } from "@/routes/users.route";
import { authRoute } from "@/types/routes/auth.route";
import { categoryRoute } from "@/types/routes/category.route";
import { courseRoute } from "@/types/routes/course.route";
import { filesRoute } from "@/types/routes/file.route";
import { instructorRoute } from "@/types/routes/instructor.route";
import { lessonRoute } from "@/types/routes/lesson.route";
import { requestRoute } from "@/types/routes/request.route";
import { Route } from "@/types/routes/route";
import { usersRoute } from "@/types/routes/users.route";
import { Router } from "express";

const router = Router();

const routes: Route[] = [
  {
    index: authRoute.index,
    routes: authRoutes,
  },
  {
    index: usersRoute.index,
    routes: userRoutes,
  },
  {
    index: categoryRoute.index,
    routes: categoryRoutes,
  },
  {
    index: filesRoute.index,
    routes: fileRoutes,
  },
  {
    index: requestRoute.index,
    routes: requestRoutes,
  },
  {
    index: courseRoute.index,
    routes: courseRoutes,
  },
  {
    index: instructorRoute.index,
    routes: instructorRoutes,
  },
  {
    index: lessonRoute.index,
    routes: lessonRoutes,
  },
];

routes.forEach((r) => router.use(r.index, r.routes));

export const apis = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         emailVerified:
 *           type: boolean
 *         image:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:00:00.000Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:00:00.000Z"
 *         role:
 *           type: string
 *
 *     ApiResponse:
 *       type: object
 *       description: Standard API response wrapper
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "success"
 *         data:
 *           type: object
 *           nullable: true
 *           description: Response payload (generic)
 *       required:
 *         - success
 *         - message
 *
 *     ApiError:
 *       type: object
 *       description: Standard API error structure
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         statusCode:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: "Bad request"
 *         errors:
 *           type: array
 *           description: Additional validation or processing errors
 *           items:
 *             type: string
 *           example: ["email is required"]
 *       required:
 *         - success
 *         - statusCode
 *         - message
 *
 *     ReqSignIn:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *
 *     ResSignIn:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Sign in successful"
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *             user:
 *               $ref: "#/components/schemas/User"
 *
 *     ReqSignUp:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */
