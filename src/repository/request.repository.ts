import { RequestCreateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { RequestType } from "@/types/request";

class RequestRepository {
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
}

export const requestRepository = new RequestRepository();
