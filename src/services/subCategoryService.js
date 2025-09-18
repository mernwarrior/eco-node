import subCategoryRepo from "../repositories/subCategoryRepository.js";
import categoryRepo from "../repositories/categoryRepository.js";

class SubCategoryService {
  async createSubCategory({ categoryId, name, image, description }) {
    const category = await categoryRepo.findById(categoryId);
    if (!category) throw { statusCode: 404, message: "Category not found" };
    return await subCategoryRepo.create({
      categoryId,
      name,
      image,
      description,
    });
  }

  async updateSubCategory(id, data) {
    const updated = await subCategoryRepo.updateById(id, data);
    if (!updated) throw { statusCode: 404, message: "SubCategory not found" };
    return updated;
  }

  async getSubCategory(id) {
    return await subCategoryRepo.findById(id);
  }
  async deleteSubCategory(id) {
    return await subCategoryRepo.deleteById(id);
  }
  async listSubCategories(query) {
    return await subCategoryRepo.list(query);
  }
}

export default new SubCategoryService();
