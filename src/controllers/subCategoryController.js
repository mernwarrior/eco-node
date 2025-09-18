import subCategoryService from "../services/subCategoryService.js";

export const createSubCategory = async (req, res) => {
  try {
    const { categoryId, name, description } = req.body;
    const image = req.file
      ? `/uploads/subcategories/${req.file.filename}`
      : null;
    const subCategory = await subCategoryService.createSubCategory({
      categoryId,
      name,
      image,
      description,
    });
    res.status(201).json({
      statusCode: 201,
      message: "SubCategory created",
      data: subCategory,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};

export const listSubCategories = async (req, res) => {
  try {
    const data = await subCategoryService.listSubCategories(req.query);
    res.json({ statusCode: 200, ...data });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const subCategory = await subCategoryService.getSubCategory(req.params.id);
    if (!subCategory)
      return res
        .status(404)
        .json({ statusCode: 404, message: "SubCategory not found" });
    res.json({ statusCode: 200, data: subCategory });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { categoryId, name, description } = req.body;
    const image = req.file
      ? `/uploads/subcategories/${req.file.filename}`
      : undefined;
    const updated = await subCategoryService.updateSubCategory(req.params.id, {
      categoryId,
      name,
      description,
      ...(image && { image }),
    });
    res.json({
      statusCode: 200,
      message: "SubCategory updated",
      data: updated,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Server error",
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await subCategoryService.getSubCategory(req.params.id);
    if (!subCategory)
      return res
        .status(404)
        .json({ statusCode: 404, message: "SubCategory not found" });
    await subCategoryService.deleteSubCategory(req.params.id);
    res.json({ statusCode: 200, message: "SubCategory deleted" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};
