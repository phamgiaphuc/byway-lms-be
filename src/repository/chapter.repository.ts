import { ChapterCreateInput, ChapterUpdateInput, ChapterWhereInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";

class ChapterRepository {
  async createChapter(chapter: ChapterCreateInput) {
    return await prisma.chapter.create({
      data: chapter,
    });
  }

  async getChapters(where: ChapterWhereInput) {
    return await prisma.chapter.findMany({
      where: where,
      orderBy: {
        createdAt: "asc",
      },
      include: {
        lessons: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }

  async getChapterById(id: string) {
    return await prisma.chapter.findUnique({
      where: {
        id,
      },
    });
  }

  async updateChapterById(id: string, chapter: ChapterUpdateInput) {
    return await prisma.chapter.update({
      where: {
        id,
      },
      data: chapter,
    });
  }

  async deleteChapterById(id: string) {
    return await prisma.chapter.delete({
      where: {
        id,
      },
    });
  }
}

export const chatperRepository = new ChapterRepository();
