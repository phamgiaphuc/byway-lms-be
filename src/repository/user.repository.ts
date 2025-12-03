import { CREDENTIALS_PROVIDER_ID } from "@/constants/account";
import { VerificationCreateInput } from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { SignUpBody } from "@/types/auth";

class UserRepository {
  async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });
  }

  async updateUserVerifiedById(id: string, status: boolean) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        emailVerified: status,
      },
    });
  }

  async findVerificationById(id: string) {
    return await prisma.verification.findUnique({
      where: {
        id,
      },
    });
  }

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

  async createVerification(verification: VerificationCreateInput) {
    return await prisma.verification.create({
      data: verification,
    });
  }
}

export const userRepository = new UserRepository();
