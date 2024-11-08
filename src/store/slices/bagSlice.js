import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: JSON.parse(localStorage.getItem('cart'))?.length || 0,
  reducers: {
    addBagCount(state, action) {
        return state = action.payload.count
    },
    removeBagCount(state, action) {
        return state = action.payload.count
    },
  },
});


export default bagSlice.reducer;
export const { addBagCount, removeBagCount } = bagSlice.actions
