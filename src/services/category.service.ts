import { categoryRepository } from "@/repository/category.repository";
import { fileRepository } from "@/repository/file.repository";
import { CreateCategorySchema, GetCategoriesSchema, UpdateCategoryByIdSchema } from "@/types/category";

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

  async getCategories(query: GetCategoriesSchema["query"]) {
    const categories = await categoryRepository.getCategories(query.keyword);
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

  async deleteCategories(ids: string[]) {
    const categories = await categoryRepository.getCategoriesByIds(ids);

    const imageIds = categories.map((category) => category.image.id);

    await fileRepository.deleteFiles(imageIds);

    return await categoryRepository.deleteCategories(ids);
  }
}

export const categoryService = new CategoryService();
