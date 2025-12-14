import { ADMIN_ROLE } from "@/constants/role";
import { BadRequestError } from "@/lib/api-error";
import { requestRepository } from "@/repository/request.repository";
import { userRepository } from "@/repository/user.repository";
import { UserPayload } from "@/types/auth";
import { requestStatus, requestType, RoleRequestSchema } from "@/types/request";

class RequestService {
  async getRequests(user: UserPayload) {
    const profile = await userRepository.findUserById(user.id);
    if (!profile) {
      throw new BadRequestError("User not found");
    }

    if (profile.role === ADMIN_ROLE) {
      const requests = await requestRepository.getRequests();
      return requests;
    }

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
        content: `This is a teach request`,
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

  async updateRequest(requestId: string, payload: RoleRequestSchema["body"]) {
    const request = await requestRepository.getRequestById(requestId);
    if (!request) {
      throw new BadRequestError("Request not found");
    }
    if (payload.status === requestStatus.APPROVED) {
      return requestRepository.approveAndUpdateUserRole(requestId, payload.userId, payload.role, payload.response);
    }
    return requestRepository.rejectRequest(requestId, payload.response);
  }
}

export const requestService = new RequestService();
