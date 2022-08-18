import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (
      state: { quantity: number; products: any[]; total: any },
      action: { payload: { product: any; price: any } }
    ) => {
      // we can only mutate our state like this in @redux/toolkit but not normal redux
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.total += action.payload.price;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
