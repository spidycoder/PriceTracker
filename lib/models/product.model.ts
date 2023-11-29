import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductUrl: { type: String, required: true, unique: true },
    Currency: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    users: { type: [String], required: true },
    discount: { type: Number, required: true },
    isOutOfStock: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
