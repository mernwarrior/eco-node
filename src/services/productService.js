import productRepo from "../repositories/productRepository.js";

class ProductService {
  async createProduct(data) {
    if (!data) throw { statusCode: 400, message: "Product data is required" };

    // Check main SKU
    if (data.sku) {
      const existing = await productRepo.findBySKU(data.sku);
      if (existing)
        throw {
          statusCode: 400,
          message: "Product with this SKU already exists",
        };
    }

    // Check variants SKU
    if (data.variants) {
      for (const variant of data.variants) {
        if (!variant.sku)
          throw {
            statusCode: 400,
            message: `Variant "${variant.name}" must have SKU`,
          };
        const existingVariant = await productRepo.findByVariantSKU(variant.sku);
        if (existingVariant)
          throw {
            statusCode: 400,
            message: `Variant SKU "${variant.sku}" already exists`,
          };
      }
    }

    return await productRepo.create(data);
  }

  async getProductById(id) {
    const product = await productRepo.findById(id);
    if (!product) throw { statusCode: 404, message: "Product not found" };
    return product;
  }

  async updateProduct(id, data) {
    if (data.sku) {
      const existing = await productRepo.findBySKU(data.sku);
      if (existing && existing._id.toString() !== id)
        throw {
          statusCode: 400,
          message: "Product with this SKU already exists",
        };
    }

    if (data.variants) {
      for (const variant of data.variants) {
        if (!variant.sku)
          throw {
            statusCode: 400,
            message: `Variant "${variant.name}" must have SKU`,
          };
        const existingVariant = await productRepo.findByVariantSKU(variant.sku);
        if (existingVariant && existingVariant._id.toString() !== id)
          throw {
            statusCode: 400,
            message: `Variant SKU "${variant.sku}" already exists`,
          };
      }
    }

    const updated = await productRepo.updateById(id, data);
    if (!updated) throw { statusCode: 404, message: "Product not found" };
    return updated;
  }

  async deleteProduct(id) {
    const deleted = await productRepo.deleteById(id);
    if (!deleted) throw { statusCode: 404, message: "Product not found" };
    return deleted;
  }

  async listProducts(query) {
    return await productRepo.list(query);
  }
}

export default new ProductService();
