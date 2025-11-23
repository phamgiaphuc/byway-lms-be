import { usersRoute } from "@/types/routes/users.route";
import { Request, Response, Router } from "express";

const router = Router();

router.get(usersRoute.getUsers, async (_: Request, res: Response) => {
  res.json({
    users: [],
  });
});

export const userRoutes = router;
