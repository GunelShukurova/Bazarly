import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";
import cartReducer from '../features/cartSlice.js';
import adminReducer from "../features/adminSlice.js";
import usersManagementReducer from "../features/usersManagementSlice.js";

export const store = configureStore({
  
  reducer: {
    user: userReducer,
   cart: cartReducer,
    admin: adminReducer,
    usersManagement: usersManagementReducer,
  },
});
