import { DefaultRoute } from "@/types/routes/route";

export interface CategoryRoute extends Omit<DefaultRoute, "default"> {
  getCategories: string;
  createCategory: string;
  getCategoryBySlug: string;
  updateCategoryById: string;
  deleteCategories: string;
}

export const categoryRoute: CategoryRoute = {
  getCategories: "/",
  createCategory: "/",
  deleteCategories: "/",
  getCategoryBySlug: "/:slug",
  updateCategoryById: "/:id",
  name: "Category",
  index: "/categories",
  status: "/status",
};
