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
        lessons: true,
      },
    });
  }

  async getChapterById(id: string) {
    return await prisma.chapter.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
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
}

export const chatperRepository = new ChapterRepository();
