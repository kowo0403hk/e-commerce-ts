import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  title: string;
  desc: string;
  img: string;
  categories?: string[] | null;
  size?: string | undefined;
  color?: string;
  price?: number;
  createAt?: Date;
  updateAt?: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
