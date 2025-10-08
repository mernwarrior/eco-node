import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: String,
  sortOrder: { type: Number, default: 0 },
  isDefault: { type: Boolean, default: false },
  colorCode: String,
});

const productVariantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  price: Number,
  stock: { type: Number, default: 0 },
  color: String,
  colorCode: String,
  size: String,
  images: [String],
  isDefault: { type: Boolean, default: false },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    shortDescription: String,
    price: Number,
    sku: { type: String, required: true, unique: true },
    categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subCategoryIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],
    tags: [String],
    image: [productImageSchema],
    variants: [productVariantSchema],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
