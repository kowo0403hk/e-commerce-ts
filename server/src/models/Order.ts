import mongoose from "mongoose";

interface OrderProduct {
  productId: string;
  quantity: number;
}

export interface OrderDocument extends mongoose.Document {
  userId: string;
  products?: OrderProduct[];
  amount: number;
  address: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new mongoose.Schema(
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
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
