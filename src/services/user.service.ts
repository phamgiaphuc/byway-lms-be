import { userRepository } from "@/repository/user.repository";

class UserService {
  async getUserProfile(id: string) {
    const user = await userRepository.findUserProfileById(id);
    return user;
  }
}

export const userService = new UserService();
