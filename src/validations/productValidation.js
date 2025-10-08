import Joi from "joi";

// ----------------------------
// Create Product Validation
// ----------------------------

export const createProductValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  sku: Joi.string().required().messages({
    "string.empty": "SKU is required",
    "any.required": "SKU is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),

  // ✅ Optional descriptive fields
  description: Joi.string().optional(),
  shortDescription: Joi.string().optional(),

  categoryIds: Joi.array().items(Joi.string().length(24)).optional(),
  subCategoryIds: Joi.array().items(Joi.string().length(24)).optional(),
  tags: Joi.array().items(Joi.string()).optional(),

  // ✅ Images
  image: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        altText: Joi.string().optional(),
        isDefault: Joi.boolean().optional(),
      })
    )
    .optional(),

  // ✅ Variants
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        sku: Joi.string().required(),
        price: Joi.number().optional(),
        stock: Joi.number().optional(),
        color: Joi.string().optional(),
        size: Joi.string().optional(),
        images: Joi.array().items(Joi.string().uri()).optional(),
        isDefault: Joi.boolean().optional(),
      })
    )
    .optional(),

  status: Joi.string().valid("active", "inactive").optional(),
  isFeatured: Joi.boolean().optional(),
});

// ----------------------------
// Update Product Validation
// ----------------------------
export const updateProductValidation = Joi.object({
  name: Joi.string().min(3).messages({
    "string.empty": "Product name cannot be empty",
    "string.min": "Product name must be at least 3 characters",
  }),
  description: Joi.string().allow(""),
  shortDescription: Joi.string().allow(""),
  price: Joi.number().positive().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
  }),
  sku: Joi.string(),
  categoryIds: Joi.array().items(Joi.string().hex().length(24)),
  subCategoryIds: Joi.array().items(Joi.string().hex().length(24)),
  tags: Joi.array().items(Joi.string()),
  status: Joi.string().valid("active", "inactive"),
  isFeatured: Joi.boolean(),
});

// ----------------------------
// Product ID Validation (params)
// ----------------------------
export const idValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.empty": "Product ID is required",
    "string.length": "Product ID must be a valid 24-character Mongo ID",
    "any.required": "Product ID is required",
  }),
});

// ----------------------------
// List Products Validation (query params)
// ----------------------------
export const listProductValidation = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),
  search: Joi.string().allow("").messages({
    "string.base": "Search must be a string",
  }),
  sortBy: Joi.string().valid("name", "price", "createdAt").default("createdAt"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
  status: Joi.string().valid("active", "inactive"),
});
