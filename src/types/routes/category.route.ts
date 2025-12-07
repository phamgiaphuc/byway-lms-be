import { DefaultRoute } from "@/types/routes/route";

export interface CategoryRoute extends Omit<DefaultRoute, "default"> {
  createCategory: string;
}

export const categoryRoute: CategoryRoute = {
  createCategory: "/",
  name: "Category",
  index: "/categories",
  status: "/status",
};
