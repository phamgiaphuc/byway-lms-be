import { Router } from "express";

export interface DefaultRoute {
  name: string;
  index: string;
  default: string;
  status: string;
}

export const apiRoute: Omit<DefaultRoute, "default" | "status"> = {
  name: "APIs",
  index: "/api",
};

export type Route = {
  index: string;
  routes: Router;
};
