import { authRoutes } from "@/routes/auth.route";
import { userRoutes } from "@/routes/users.route";
import { authRoute } from "@/types/routes/auth.route";
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
];

routes.forEach((r) => router.use(r.index, r.routes));

export const apis = router;
