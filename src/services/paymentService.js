import paymentRepo from "../repositories/paymentRepository.js";
import orderRepo from "../repositories/orderRepository.js";

class PaymentService {
  // Create a new payment
  async createPayment(data) {
    if (!data) throw { statusCode: 400, message: "Payment data is required" };

    const { orderId, amount, paymentMethod, paymentStatus } = data;

    if (!orderId) throw { statusCode: 400, message: "Order ID is required" };

    // Optional: check if order exists
    const order = await orderRepo.findById(orderId);
    if (!order) throw { statusCode: 404, message: "Order not found" };

    // Create payment
    const payment = await paymentRepo.create(data);

    // If payment is done, update order status
    if (paymentStatus === "paid") {
      await orderRepo.updateById(orderId, { status: "paid" });
    }

    return payment;
  }

  // Get payment by ID
  async getPaymentById(id) {
    const payment = await paymentRepo.findById(id);
    if (!payment) throw { statusCode: 404, message: "Payment not found" };
    return payment;
  }

  // List all payments with optional query filters
  async listPayments(query) {
    return await paymentRepo.list(query);
  }

  // Delete payment
  async deletePayment(id) {
    const deleted = await paymentRepo.deleteById(id);
    if (!deleted) throw { statusCode: 404, message: "Payment not found" };
    return deleted;
  }
}

export default new PaymentService();
