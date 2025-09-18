import categoryRepo from "../repositories/categoryRepository.js";

class CategoryService {
  async createCategory({ name, description, image }) {
    const existing = await categoryRepo.findByName(name);
    if (existing) {
      throw { statusCode: 400, message: "Category already exists" };
    }

    const category = await categoryRepo.create({ name, description, image });
    return category;
  }

  async updateCategory(id, data) {
    const updated = await categoryRepo.updateById(id, data);
    if (!updated) {
      throw { statusCode: 404, message: "Category not found" };
    }
    return updated;
  }

  async getCategory(id) {
    const category = await categoryRepo.findById(id);
    if (!category) {
      throw { statusCode: 404, message: "Category not found" };
    }
    return category;
  }

  async deleteCategory(id) {
    const deleted = await categoryRepo.deleteById(id);
    if (!deleted) {
      throw { statusCode: 404, message: "Category not found" };
    }
    return deleted;
  }

  async listCategories(query) {
    return await categoryRepo.list(query);
  }
}

// ✅ Singleton instance export
export default new CategoryService();
