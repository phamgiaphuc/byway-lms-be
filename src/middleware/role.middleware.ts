import { BadRequestError, UnauthorizedError } from "@/lib/api-error";
import { userRepository } from "@/repository/user.repository";
import { UserPayload } from "@/types/auth";
import { Role } from "@/types/user";
import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: Role[]) => async (req: Request, _: Response, next: NextFunction) => {
  const user = req.user as UserPayload;
  if (!user) {
    return next(new UnauthorizedError());
  }

  const profile = await userRepository.findUserProfileById(user.id);
  if (!profile) {
    return next(new BadRequestError("User not found"));
  }

  if (!roles.includes(profile.role as Role)) {
    return next(new BadRequestError("Permission denied"));
  }

  next();
};
