import { ApiResponse } from "@/lib/api-response";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { usersRoute } from "@/types/routes/users.route";
import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */
router.get(usersRoute.getMe, jwtMiddleware(), async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { user: req.user }, "Get me successful"));
});

export const userRoutes = router;
