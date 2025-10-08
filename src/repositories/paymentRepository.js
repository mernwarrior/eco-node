import Payment from "../models/paymentModel.js";

class PaymentRepository {
  async create(data) {
    return await new Payment(data).save();
  }

  async findById(id) {
    return await Payment.findById(id).populate("orderId");
  }

  async list(query) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      Payment.countDocuments(query),
      Payment.find(query)
        .populate("orderId")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
    ]);

    return {
      data,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit) || 1,
    };
  }

  async deleteById(id) {
    return await Payment.findByIdAndDelete(id);
  }
}

export default new PaymentRepository();
