import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlide.js";


export const store = configureStore({
  reducer: {
    user: userReducer,
  
  },
});
