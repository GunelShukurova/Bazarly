import { createSlice } from "@reduxjs/toolkit";

import { getUserById } from "../../services/users/requests";



const userId = localStorage.getItem("userId");
const initialState = { user: null, balance: 0  };
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
  if (state.user) {
    state.user.balance = action.payload;
  } else {
    state.user = { balance: action.payload };
  }
},
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
    }, updatePassword(state, action) {
        state.user = { ...state.user, password: action.payload.newPassword };
    },
   
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout, updateBalance, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
