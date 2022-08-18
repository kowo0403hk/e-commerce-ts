// create a global store that every page can have access
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
