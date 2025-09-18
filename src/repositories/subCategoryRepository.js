import SubCategory from "../models/subCategoryModel.js";

class SubCategoryRepository {
  async create(data) {
    return await new SubCategory(data).save();
  }
  async findById(id) {
    return await SubCategory.findById(id).populate("categoryId", "name");
  }
  async updateById(id, data) {
    return await SubCategory.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("categoryId", "name");
  }
  async deleteById(id) {
    return await SubCategory.findByIdAndDelete(id);
  }

  async list({
    page = 1,
    limit = 10,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
    categoryId,
    active,
  }) {
    const query = {};

    // 🔍 search in name and description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (categoryId) query.categoryId = categoryId;
    if (typeof active !== "undefined")
      query.isActive = active === "true" || active === true;

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [total, data] = await Promise.all([
      SubCategory.countDocuments(query),
      SubCategory.find(query)
        .populate("categoryId", "name") // 👈 show category name only
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
    ]);

    return {
      data,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit) || 1,
      limit: Number(limit),
    };
  }
}

export default new SubCategoryRepository();
