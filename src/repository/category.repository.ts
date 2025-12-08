import { CategoryCreateInput } from "@/lib/generated/prisma/models";
import { generateSlug } from "@/lib/helper";
import { prisma } from "@/lib/prisma";

class CategoryRepository {
  async generateUniqueSlug(name: string) {
    const baseSlug = generateSlug(name);
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const exists = await prisma.category.findFirst({
        where: { slug },
      });
      if (!exists) {
        return slug;
      }
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  async findCategoryBySlug(slug: string) {
    return await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        image: true,
      },
      omit: {
        imageId: true,
      },
    });
  }

  async createCategory(category: CategoryCreateInput) {
    return await prisma.category.create({
      data: category,
      include: {
        image: true,
      },
      omit: {
        imageId: true,
      },
    });
  }

  async getCategories() {
    return await prisma.category.findMany({
      include: {
        image: true,
      },
      omit: {
        imageId: true,
      },
    });
  }
}

export const categoryRepository = new CategoryRepository();
