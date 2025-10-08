import Product from "../models/productModel.js";

class ProductRepository {
  async create(data) {
    return await new Product(data).save();
  }

  async findById(id) {
    return await Product.findById(id)
      .populate("categoryIds", "name")
      .populate("subCategoryIds", "name");
  }

  async updateById(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true })
      .populate("categoryIds", "name")
      .populate("subCategoryIds", "name");
  }

  async deleteById(id) {
    return await Product.findByIdAndDelete(id);
  }

  async list(query) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      status,
    } = query;
    const q = {};

    if (search) {
      q.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (status) q.status = status;

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [total, data] = await Promise.all([
      Product.countDocuments(q),
      Product.find(q)
        .populate("categoryIds", "name")
        .populate("subCategoryIds", "name")
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

  async findBySKU(sku) {
    return await Product.findOne({ sku });
  }

  async findByVariantSKU(sku) {
    return await Product.findOne({ "variants.sku": sku });
  }
}

export default new ProductRepository();
