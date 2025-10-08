import productService from "../services/productService.js";

export const createProduct = async (req, res) => {
  try {
    let image = req.file
      ? `/uploads/products/${req.file.filename}`
      : req.body.image;
    const product = await productService.createProduct({ ...req.body, image });
    res
      .status(201)
      .json({ statusCode: 201, message: "Product created", data: product });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let image = req.file
      ? `/uploads/products/${req.file.filename}`
      : req.body.image;
    const payload = { ...req.body, image };
    const updated = await productService.updateProduct(req.params.id, payload);
    res.json({ statusCode: 200, message: "Product updated", data: updated });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json({ statusCode: 200, data: product });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ statusCode: 200, message: "Product deleted" });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};

export const listProducts = async (req, res) => {
  try {
    const result = await productService.listProducts(req.query);
    res.json({ statusCode: 200, ...result });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};
