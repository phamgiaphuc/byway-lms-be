import { CREDENTIALS_PROVIDER_ID } from "@/constants/account";
import { prisma } from "@/lib/prisma";
import { SignUpBody } from "@/types/auth";

class UserRepository {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    });
  }

  async createUserWithAccount(data: SignUpBody) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`,
        accounts: {
          create: {
            providerId: CREDENTIALS_PROVIDER_ID,
            password: data.password,
          },
        },
      },
    });
  }
}

export const userRepository = new UserRepository();
