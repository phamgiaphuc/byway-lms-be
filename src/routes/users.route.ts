import { ApiResponse } from "@/lib/api-response";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { usersRoute } from "@/types/routes/users.route";
import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(usersRoute.getUsers, async (_: Request, res: Response) => {
  res.json({
    users: [],
  });
});

router.get(usersRoute.getMe, jwtMiddleware(), async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { user: req.user }, "Get me successful"));
});

export const userRoutes = router;
