import { createSlice } from "@reduxjs/toolkit";

const savedUsers = localStorage.getItem("users");
const initialUsers = savedUsers ? JSON.parse(savedUsers) : null;

const initialState = {
  users: initialUsers,
};

const userSlice = createSlice({
  name: "usersManagement",
  initialState,
  reducers: {
    updateUsers(state, action) {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(action.payload));
    },
    logout(state) {
      state.users = [];
      localStorage.removeItem("users");
    },
     deleteUser(state, action) {
        state.users = state.users.filter(user => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { updateUsers, logout } = userSlice.actions;
export default userSlice.reducer;

