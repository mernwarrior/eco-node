import categoryService from "../services/categoryService.js";
import path from "path";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let image = null;
    if (req.file) {
      image = `/uploads/categories/${req.file.filename}`;
    }

    const category = await categoryService.createCategory({
      name,
      description,
      image,
    });
    res.status(201).json({
      statusCode: 201,
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, imageUrl, isActive } = req.body;
    let image = imageUrl || undefined;
    if (req.file) image = `/uploads/categories/${req.file.filename}`;

    const payload = {};
    if (typeof name !== "undefined") payload.name = name;
    if (typeof description !== "undefined") payload.description = description;
    if (typeof image !== "undefined") payload.image = image;
    if (typeof isActive !== "undefined") payload.isActive = isActive;

    const updated = await categoryService.updateCategory(id, payload);
    res.json({ statusCode: 200, message: "Category updated", data: updated });
  } catch (err) {
    // console.error(err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const cat = await categoryService.getCategory(req.params.id);
    if (!cat)
      return res
        .status(404)
        .json({ statusCode: 404, message: "Category not found" });
    res.json({ statusCode: 200, data: cat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Pehle check karo category exist karti hai ya nahi
    const category = await categoryService.getCategory(id);
    if (!category) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Category ID not found" });
    }

    await categoryService.deleteCategory(id);

    return res.json({
      statusCode: 200,
      message: "Category deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

export const listCategories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      active,
    } = req.query;
    const result = await categoryService.listCategories({
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      active,
    });
    res.json({ statusCode: 200, ...result });
  } catch (err) {
    //console.error(err);
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};
