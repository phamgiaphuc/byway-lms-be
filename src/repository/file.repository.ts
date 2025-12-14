import { prisma } from "@/lib/prisma";

class FileRepository {
  async deleteFiles(ids: string[]) {
    return await prisma.file.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const fileRepository = new FileRepository();
