import { DefaultRoute } from "@/types/routes/route";

export interface StatsRoute extends Omit<DefaultRoute, "default"> {
  getStats: string;
}

export const statsRoute: StatsRoute = {
  getStats: "/",
  name: "Statistic",
  index: "/statistic",
  status: "/status",
};
