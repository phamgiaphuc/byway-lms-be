import { authRoute } from "@/types/routes/auth.route";
import { Request, Router, Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(authRoute.status, (_: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "Auth APIs",
    status: "success",
  });
});

export const authRoutes = router;
