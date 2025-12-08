import { categoryController } from "@/controller/category.controller";
import { jwtMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { schemaValidation } from "@/middleware/validation.middleware";
import { createCategorySchema, getCategoryBySlugSchema } from "@/types/category";
import { categoryRoute } from "@/types/routes/category.route";
import { Router } from "express";

const router = Router();

router.get(categoryRoute.getCategories, categoryController.getCategories);

router.post(
  categoryRoute.createCategory,
  jwtMiddleware(),
  roleMiddleware(["admin"]),
  schemaValidation(createCategorySchema),
  categoryController.createCategory,
);

router.get(
  categoryRoute.getCategoryBySlug,
  schemaValidation(getCategoryBySlugSchema),
  categoryController.getCategoryBySlug,
);

export const categoryRoutes = router;
