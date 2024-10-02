import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartItems: [],
};

let Slice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addTocart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
  },
});

export const { addTocart, removeFromCart } = Slice.actions;
export default Slice.reducer;
