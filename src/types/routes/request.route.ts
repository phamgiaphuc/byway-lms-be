import { DefaultRoute } from "@/types/routes/route";

export interface RequestRoute extends Omit<DefaultRoute, "default"> {
  createTeachRequest: string;
  updateRequestById: string;
  getRequests: string;
}

export const requestRoute: RequestRoute = {
  getRequests: "/",
  updateRequestById: "/:id",
  createTeachRequest: "/teach",
  name: "Request",
  index: "/requests",
  status: "/status",
};
