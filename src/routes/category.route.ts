import { jwtMiddleware } from "@/middleware/auth.middleware";
import { categoryRoute } from "@/types/routes/category.route";
import { Request, Response, Router } from "express";

const router = Router();

router.post(categoryRoute.createCategory, jwtMiddleware(), (req: Request, res: Response) => {
  res.json({ body: req.body });
});

export const categoryRoutes = router;
