import { BadRequestError } from "@/lib/api-error";
import { requestRepository } from "@/repository/request.repository";
import { UserPayload } from "@/types/auth";
import { requestStatus, requestType } from "@/types/request";

class RequestService {
  async getRequests(user: UserPayload) {
    const requests = await requestRepository.getRequestsByUserId(user.id);
    return requests;
  }

  async createTeachRequest(user: UserPayload, agree: boolean) {
    if (!agree) {
      throw new BadRequestError("You must agree to the policies");
    }
    const request = await requestRepository.getRequestByUserIdAndType(user.id, requestType.TEACHING);
    if (!request || request.status === requestStatus.REJECTED) {
      const request = await requestRepository.createRequest({
        title: "Teach Request",
        content: `This is a teach request from user with email ${user.email}`,
        type: requestType.TEACHING,
        user: {
          connect: {
            id: user.id,
          },
        },
      });
      return request;
    }
    if (request.status === requestStatus.PENDING) {
      throw new BadRequestError("Request is pending");
    }
    throw new BadRequestError("Request is already completed");
  }
}

export const requestService = new RequestService();
