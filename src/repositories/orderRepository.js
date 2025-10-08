import Order from "../models/orderModel.js";

class OrderRepository {
  async create(data) {
    return await new Order(data).save();
  }

  async findById(id) {
    return await Order.findById(id)
      .populate("userId", "fullName email phone") // 🔥 Only fetch selected user fields
      .populate("items.productId", "name price sku");
  }

  async list(query) {
    return await Order.find(query)
      .populate("userId", "fullName email phone")
      .populate("items.productId", "name price sku");
  }

  async updateById(id, data) {
    return await Order.findByIdAndUpdate(id, data, { new: true })
      .populate("userId", "fullName email phone")
      .populate("items.productId", "name price sku");
  }
}

export default new OrderRepository();
