import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  title: string;
  desc: string;
  img: string;
  categories?: string[] | null;
  size?: string[];
  color?: string[];
  price?: number;
  inStock?: boolean;
  createAt?: Date;
  updateAt?: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
