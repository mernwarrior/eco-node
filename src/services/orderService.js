import orderRepo from "../repositories/orderRepository.js";

class OrderService {
  async createOrder(data) {
    return await orderRepo.create(data);
  }

  async getOrderById(id) {
    const order = await orderRepo.findById(id);
    if (!order) throw { statusCode: 404, message: "Order not found" };
    return order;
  }

  async updateOrder(id, data) {
    const updated = await orderRepo.updateById(id, data);
    if (!updated) throw { statusCode: 404, message: "Order not found" };
    return updated;
  }

  async deleteOrder(id) {
    const deleted = await orderRepo.deleteById(id);
    if (!deleted) throw { statusCode: 404, message: "Order not found" };
    return deleted;
  }

  async listOrders(query) {
    return await orderRepo.list(query);
  }
}

export default new OrderService();
