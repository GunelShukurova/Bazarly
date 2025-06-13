import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../constants";
import { getUserById } from "../../services/users/requests";



const userId = localStorage.getItem("userId");
const initialState = { user: null };
if (userId) {
 
  const userId = JSON.parse(localStorage.getItem("userId"));
const response = await getUserById(userId);
const user = response.data;
  if (user.isBanned) {
    localStorage.setItem("userId", JSON.stringify(null));
    initialState.user = { user: null };
    alert("your account has been banned!");
    window.location.reload();
  }
  if (user?.id) {
    delete user.password;
    initialState.user = { ...user };
  }
} else {
  localStorage.setItem("userId", JSON.stringify(null));
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.user = { ...action.payload };
    },
    updateBalance(state, action) {
      state.user = { ...state.user, balance: action.payload };
    },
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout, updateBalance, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
