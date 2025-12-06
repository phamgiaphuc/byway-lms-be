import { userController } from "@/controller/user.controller";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { usersRoute } from "@/types/routes/users.route";
import { Router } from "express";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users endpoints
 */
const router = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get me
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Get me successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/User"
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.get(usersRoute.getMe, jwtMiddleware(), userController.getUserProfile);

export const userRoutes = router;
