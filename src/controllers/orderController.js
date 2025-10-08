import orderService from "../services/orderService.js";

export const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res
      .status(201)
      .json({ statusCode: 201, message: "Order created", data: order });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json({ statusCode: 200, data: order });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await orderService.listOrders(req.query);
    res.json({ statusCode: 200, data: orders });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    res.json({ statusCode: 200, message: "Order updated", data: order });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.json({ statusCode: 200, message: "Order deleted" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
