import paymentService from "../services/paymentService.js";

export const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json({
      statusCode: 201,
      message: "Payment recorded and order status updated",
      data: payment,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const listPayments = async (req, res) => {
  try {
    const payments = await paymentService.listPayments(req.query);
    res.json({ statusCode: 200, data: payments });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    res.status(200).json({ statusCode: 200, data: payment });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Server error" });
  }
};

export const deletePayment = async (req, res) => {
  try {
    await paymentService.deletePayment(req.params.id);
    res
      .status(200)
      .json({ statusCode: 200, message: "Payment deleted successfully" });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Server error" });
  }
};
