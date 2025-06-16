import { createSlice } from "@reduxjs/toolkit";

import { getUserById } from "../../services/users/requests";



const userId = localStorage.getItem("userId");
const initialState = { users: null, balance: 0  };
if (userId) {
 
  const userId = JSON.parse(localStorage.getItem("userId"));
  
const response = await getUserById(userId);

const user = response.data;

console.log(user)
  // if (user.isBanned) {
  //   localStorage.setItem("userId", JSON.stringify(null));
  //   initialState.user = { user: null };
  //   alert("your account has been banned!");
  //   window.location.reload();
  // }
  if (user?.id) {
    delete user.password;
    initialState.users = { ...user };
  }
} else {
  localStorage.setItem("userId", JSON.stringify(null));
}

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.users = { ...action.payload };
    },
   updateBalance(state, action) {
  if (state.users) {
    state.users.balance = action.payload;
  } else {
    state.users = { balance: action.payload };
  }
},
    updateProfile(state, action) {
      state.users = { ...state.users, ...action.payload };
    }, updatePassword(state, action) {
        state.users = { ...state.users, password: action.payload.newPassword };
    },
   
    logout(state) {
      state.users = null;
    },
  },
});

export const { login, logout, updateBalance, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
