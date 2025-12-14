import { RequestCreateInput, RequestUpdateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { requestStatus, RequestType } from "@/types/request";

class RequestRepository {
  async getRequests() {
    return await prisma.request.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createRequest(request: RequestCreateInput) {
    return await prisma.request.create({
      data: request,
    });
  }

  async getRequestsByUserId(userId: string) {
    return await prisma.request.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getRequestByUserIdAndType(userId: string, type: RequestType) {
    return await prisma.request.findFirst({
      where: {
        userId: userId,
        type: type,
      },
    });
  }

  async getRequestById(id: string) {
    return prisma.request.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async updateRequest(id: string, data: RequestUpdateInput) {
    return prisma.request.update({
      where: { id },
      data,
    });
  }

  async approveAndUpdateUserRole(requestId: string, userId: string, role: string, response?: string) {
    return prisma.$transaction(async (tx) => {
      const request = await tx.request.update({
        where: { id: requestId },
        data: {
          status: requestStatus.APPROVED,
          response,
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          role,
        },
      });

      return request;
    });
  }

  async rejectRequest(requestId: string, response?: string) {
    return prisma.request.update({
      where: { id: requestId },
      data: {
        status: requestStatus.REJECTED,
        response,
      },
    });
  }
}

export const requestRepository = new RequestRepository();
