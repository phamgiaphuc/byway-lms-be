import { categoryRepository } from "@/repository/category.repository";
import { CreateCategorySchema, UpdateCategoryByIdSchema } from "@/types/category";

class CategoryService {
  async createCategory(body: CreateCategorySchema["body"]) {
    const { name, image } = body;
    const slug = await categoryRepository.generateUniqueSlug(name);
    const category = await categoryRepository.createCategory({
      name: name,
      slug: slug,
      image: {
        create: {
          ext: image.ext,
          name: image.name,
          url: image.url,
        },
      },
    });
    return category;
  }

  async getCategoryBySlug(slug: string) {
    const category = await categoryRepository.findCategoryBySlug(slug);
    return category;
  }

  async getCategories() {
    const categories = await categoryRepository.getCategories();
    return categories;
  }

  async updateCategoryById(id: string, body: UpdateCategoryByIdSchema["body"]) {
    const { name, image } = body;
    const slug = await categoryRepository.generateUniqueSlug(name, id);
    const category = await categoryRepository.updateCategoryById(id, {
      name: name,
      slug: slug,
      image: {
        update: image,
      },
    });
    return category;
  }
}

export const categoryService = new CategoryService();
