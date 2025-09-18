import Category from "../models/categoryModel.js";

class CategoryRepository {
  async create(data) {
    return await new Category(data).save();
  }

  async findById(id) {
    return await Category.findById(id);
  }

  async findByName(name) {
    return await Category.findOne({ name });
  }

  async updateById(id, data) {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await Category.findByIdAndDelete(id);
  }

  async list({
    page = 1,
    limit = 10,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
    active,
  }) {
    const query = {};

    // 🔍 Multi-field search (name + description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (typeof active !== "undefined") {
      query.isActive = active === "true" || active === true;
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [total, data] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query).sort(sort).skip(skip).limit(Number(limit)),
    ]);

    const pages = Math.ceil(total / limit) || 1;

    return {
      data,
      total,
      page: Number(page),
      pages,
      limit: Number(limit),
    };
  }
}

export default new CategoryRepository();
