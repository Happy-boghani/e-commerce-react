import { configureStore } from "@reduxjs/toolkit";
import bagSlice from "./slices/bagSlice";
import usertokenSlice from "./slices/usertokenSlice";

const store = configureStore({
    reducer:{
        bags: bagSlice,
        user: usertokenSlice,
    }
})

export default store