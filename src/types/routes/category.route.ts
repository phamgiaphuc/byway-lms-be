import { DefaultRoute } from "@/types/routes/route";

export interface CategoryRoute extends Omit<DefaultRoute, "default"> {
  getCategories: string;
  createCategory: string;
  getCategoryBySlug: string;
}

export const categoryRoute: CategoryRoute = {
  getCategories: "/",
  createCategory: "/",
  getCategoryBySlug: "/:slug",
  name: "Category",
  index: "/categories",
  status: "/status",
};
