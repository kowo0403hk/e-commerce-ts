import mongoose from "mongoose";

interface CartProduct {
  productId: string;
  quantity: number;
}

export interface CartDocument extends mongoose.Document {
  userId: string;
  products?: CartProduct[];
}

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
