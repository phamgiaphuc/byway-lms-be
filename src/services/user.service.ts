import { UnauthorizedError } from "@/lib/api-error";
import { userRepository } from "@/repository/user.repository";

class UserService {
  async getUserProfile(id: string) {
    const user = await userRepository.findUserProfileById(id);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    return user;
  }
}

export const userService = new UserService();
