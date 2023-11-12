import { configureStore } from "@reduxjs/toolkit";
import loremSlice from '../features/foodlist/foodListSlice';
import catSlice from "../features/foodlist/categoryListSlice";


const store = configureStore({
  reducer: {
    foodlist: loremSlice.reducer,
    category:catSlice.reducer
  },
});

export default store;