import { createSlice } from "@reduxjs/toolkit";

interface ReduxCartProduct {
  _id?: number;
  title?: string;
  desc?: string;
  img?: string;
  categories?: string[] | null;
  size?: string[];
  color?: string[];
  price?: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (
      state: {
        quantity: number;
        products: ReduxCartProduct[];
        total: number;
      },
      action: {
        payload: ReduxCartProduct;
      }
    ) => {
      // we can only mutate our state like this in @redux/toolkit but not normal redux
      state.quantity += 1; // product numbers in the cart, not about quantity of per product
      state.products.push(action.payload);
      state.total += action!.payload!.price! * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
